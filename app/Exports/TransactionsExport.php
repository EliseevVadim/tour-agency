<?php

namespace App\Exports;

use App\Models\PaymentTransaction;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;

class TransactionsExport implements FromQuery, WithHeadings, WithMapping, WithChunkReading, ShouldAutoSize, WithStrictNullComparison
{
    /** @var array */
    private $columns;

    /** @var string|null */
    private $status;

    /** @var int|null */
    private $packageId;

    /** @var string|null YYYY-MM-DD */
    private $dateFrom;

    /** @var string|null YYYY-MM-DD */
    private $dateTo;

    /** @var bool */
    private $cancelledOrPendingWithPaidReferral;

    /**
     * @param array $columns  список ключей колонок (whitelist)
     * @param string|null $status
     * @param int|null $packageId
     * @param string|null $dateFrom YYYY-MM-DD
     * @param string|null $dateTo   YYYY-MM-DD (включительно)
     * @param bool $cancelledOrPendingWithPaidReferral
     */

    public function __construct(array $columns, $status = null, $packageId = null, $dateFrom = null, $dateTo = null, $cancelledOrPendingWithPaidReferral = false)
    {
        $this->columns = $columns;
        $this->status = $status;
        $this->packageId = $packageId;
        $this->dateFrom = $dateFrom;
        $this->dateTo = $dateTo;
        $this->cancelledOrPendingWithPaidReferral = (bool) $cancelledOrPendingWithPaidReferral;
    }

    public static function columnsMap(): array
    {
        return [
            // Пользователь
            'user_full_name' => [
                'heading' => 'Пользователь: ФИО',
                'value' => function ($t) { return optional($t->user)->full_name ?: '-'; },
            ],
            'user_email' => [
                'heading' => 'Пользователь: Почта',
                'value' => function ($t) { return optional($t->user)->email ?: ''; },
            ],
            'user_phone' => [
                'heading' => 'Пользователь: Номер',
                'value' => function ($t) { return optional($t->user)->phone_number ?: ''; },
            ],

            // Пакет
            'package_name' => [
                'heading' => 'Пакет',
                'value' => function ($t) { return optional($t->package)->name ?: '-'; },
            ],

            // Транзакция
            'status' => [
                'heading' => 'Статус транзакции',
                'value' => function ($t) { return $t->status ?: ''; },
            ],
            'amount' => [
                'heading' => 'Сумма',
                'value' => function ($t) { return $t->amount; },
            ],
            'payment_at' => [
                'heading' => 'Дата оплаты',
                'value' => function ($t) { return $t->payment_at; },
            ],

            // Реферал
            'referrer_full_name' => [
                'heading' => 'Реферал: ФИО',
                'value' => function ($t) { return optional($t->referral)->full_name ?: '-'; },
            ],
            'referrer_email' => [
                'heading' => 'Реферал: Почта',
                'value' => function ($t) { return optional($t->referral)->email ?: ''; },
            ],
            'referrer_tg_username' => [
                'heading' => 'Реферал: TG Username',
                'value' => function ($t) { return optional($t->referral)->tg_username ?: ''; },
            ],

            // Ссылка на оплату
            'payment_link' => [
                'heading' => 'Ссылка на оплату',
                'value' => function ($t) { return $t->payment_link ?: ''; },
            ],
        ];
    }

    public function query(): Builder
    {
        $q = PaymentTransaction::query()
            ->with([
                'user:id,full_name,email,phone_number',
                'package:id,name',
                'referral:id,full_name,email,tg_username',
            ])
            ->orderByDesc('id');

        if ($this->cancelledOrPendingWithPaidReferral) {
            $q->where(function ($sub) {
                $sub->where('status', 'cancelled')
                    ->orWhere(function ($q2) {
                        $q2->where('status', 'pending')->where('paid_referral_fee', true);
                    });
            });
        } else {
            if (!empty($this->status)) {
                $q->where('status', $this->status);
            }
        }

        if (!empty($this->packageId)) {
            $q->where('package_id', $this->packageId);
        }

        if (!empty($this->dateFrom)) {
            $q->whereDate('created_at', '>=', $this->dateFrom);
        }

        if (!empty($this->dateTo)) {
            $toExclusive = Carbon::createFromFormat('Y-m-d', $this->dateTo)->addDay()->format('Y-m-d');
            $q->where('created_at', '<', $toExclusive);
        }

        return $q;
    }

    public function headings(): array
    {
        $map = self::columnsMap();

        return array_map(function ($key) use ($map) {
            return $map[$key]['heading'];
        }, $this->columns);
    }

    public function map($t): array
    {
        $map = self::columnsMap();
        $row = [];

        foreach ($this->columns as $key) {
            $getter = $map[$key]['value'];
            $row[] = $getter($t);
        }

        return $row;
    }

    public function chunkSize(): int
    {
        return 2000;
    }
}
