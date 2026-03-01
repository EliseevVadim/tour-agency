<?php

namespace App\Exports;

use Carbon\Carbon;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;

class TransactionsExport implements FromQuery, WithHeadings, WithMapping, WithChunkReading, ShouldAutoSize, WithStrictNullComparison
{
    /** @var array */
    private $columns;

    /** @var string|null */
    private $status;

    /** @var string|null */
    private $packageId;

    /** @var string|null YYYY-MM-DD */
    private $dateFrom;

    /** @var string|null YYYY-MM-DD */
    private $dateTo;

    /** @var bool */
    private $cancelledOrPendingWithPaidReferral;

    public function __construct(
        array $columns,
              $status = null,
              $packageId = null,
              $dateFrom = null,
              $dateTo = null,
              $cancelledOrPendingWithPaidReferral = false
    ) {
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
            'user_full_name' => [
                'heading' => 'Пользователь: ФИО',
                'value' => function ($t) { return $t->user_full_name ?: '-'; },
            ],
            'user_email' => [
                'heading' => 'Пользователь: Почта',
                'value' => function ($t) { return $t->user_email ?: ''; },
            ],
            'user_phone' => [
                'heading' => 'Пользователь: Номер',
                'value' => function ($t) { return $t->user_phone ?: ''; },
            ],
            'package_name' => [
                'heading' => 'Пакет',
                'value' => function ($t) { return $t->package_name ?: '-'; },
            ],
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
            'referrer_full_name' => [
                'heading' => 'Реферал: ФИО',
                'value' => function ($t) { return $t->referrer_full_name ?: '-'; },
            ],
            'referrer_email' => [
                'heading' => 'Реферал: Почта',
                'value' => function ($t) { return $t->referrer_email ?: ''; },
            ],
            'referrer_tg_username' => [
                'heading' => 'Реферал: TG Username',
                'value' => function ($t) { return $t->referrer_tg_username ?: ''; },
            ],
            'payment_link' => [
                'heading' => 'Ссылка на оплату',
                'value' => function ($t) { return $t->payment_link ?: ''; },
            ],
            'created_at' => [
                'heading' => 'Дата создания',
                'value' => function ($t) {
                    return $t->created_at
                        ? \Carbon\Carbon::parse($t->created_at)->format('d.m.Y H:i')
                        : '';
                },
            ],
        ];
    }

    public function query(): Builder
    {
        $q = DB::table('payment_transactions as t')
            ->join('users as u', 'u.id', '=', 't.user_id')
            ->leftJoin('packages as p', 'p.id', '=', 't.package_id')
            ->leftJoin('referrals as r', 'r.id', '=', 't.ref_id')
            ->select([
                't.id',
                't.user_id',
                't.package_id',
                't.status',
                't.amount',
                't.payment_at',
                't.payment_link',
                't.paid_referral_fee',
                't.created_at',
                't.updated_at',

                DB::raw('u.full_name AS user_full_name'),
                DB::raw('u.email AS user_email'),
                DB::raw('u.phone_number AS user_phone'),

                DB::raw('COALESCE(p.name, t.package_id) AS package_name'),

                DB::raw('r.full_name AS referrer_full_name'),
                DB::raw('r.email AS referrer_email'),
                DB::raw('r.tg_username AS referrer_tg_username'),
            ]);

        if ($this->cancelledOrPendingWithPaidReferral) {
            $q->where(function ($sub) {
                $sub->where('t.status', 'canceled')
                    ->orWhere(function ($q2) {
                        $q2->where('t.status', 'pending')
                            ->where('t.send_notification', true);
                    });
            });

            $q->whereNotExists(function ($s) {
                $s->selectRaw('1')
                    ->from('payment_transactions as s')
                    ->whereColumn('s.user_id', 't.user_id')
                    ->where('s.status', 'succeeded');
            });

            $q->whereNotExists(function ($t2) {
                $t2->selectRaw('1')
                    ->from('payment_transactions as t2')
                    ->whereColumn('t2.user_id', 't.user_id')
                    ->whereColumn('t2.package_id', 't.package_id')
                    ->where(function ($cand) {
                        $cand->where('t2.status', 'canceled')
                            ->orWhere(function ($q2) {
                                $q2->where('t2.status', 'pending')
                                    ->where('t2.send_notification', true);
                            });
                    })
                    ->where(function ($cmp) {
                        $cmp->whereColumn('t2.created_at', '>', 't.created_at')
                            ->orWhere(function ($eq) {
                                $eq->whereColumn('t2.created_at', '=', 't.created_at')
                                    ->whereColumn('t2.id', '>', 't.id');
                            });
                    });
            });

        } else {
            if (!empty($this->status)) {
                $q->where('t.status', $this->status);
            }
        }

        if (!empty($this->packageId)) {
            $q->where('t.package_id', $this->packageId);
        }

        if (!empty($this->dateFrom)) {
            $q->whereDate('t.created_at', '>=', $this->dateFrom);
        }

        if (!empty($this->dateTo)) {
            $toExclusive = Carbon::createFromFormat('Y-m-d', $this->dateTo)->addDay()->format('Y-m-d');
            $q->where('t.created_at', '<', $toExclusive);
        }

        $q->orderBy('t.user_id', 'asc')
            ->orderBy('t.package_id', 'asc')
            ->orderBy('t.created_at', 'desc')
            ->orderBy('t.id', 'desc');

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
