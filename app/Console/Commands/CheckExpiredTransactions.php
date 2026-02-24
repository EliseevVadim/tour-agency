<?php

namespace App\Console\Commands;

use App\Models\Package;
use App\Models\PaymentTransaction;
use App\Services\NotificationService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Log;

class CheckExpiredTransactions extends Command
{
    protected $signature = 'transactions:check-expired';
    protected $description = 'Checks for transactions that have expired without payment.';

    public function __construct(NotificationService $notificationService)
    {
        parent::__construct();
        $this->notificationService = $notificationService;
    }

    public function handle(): void
    {
        $this->info('Starting check for expired transactions...');

        $expiredTransactions = PaymentTransaction::where('status', 'pending')
            ->where('expires_at', '<=', Carbon::now())
            ->get();

        if ($expiredTransactions->isEmpty()) {
            $this->info('No expired transactions found.');
            return;
        }

        $this->warn(count($expiredTransactions) . ' transactions found to be expired.');

        foreach ($expiredTransactions as $transaction) {
            try {
                $this->processExpiredTransaction($transaction);
            } catch (\Exception $e) {
                Log::error("Failed to process expired transaction ID {$transaction->id}: " . $e->getMessage());
                $this->error("Error processing transaction ID: {$transaction->id}");
            }
        }

        $this->info('Finished checking expired transactions.');
    }

    protected function processExpiredTransaction(PaymentTransaction $transaction): void
    {
        Log::info("Processing expiry for Transaction ID: {$transaction->id}");
        $transaction->load('user', 'package', 'referral');

        $package = $transaction->package;
        $user = $transaction->user;
        $ref = $transaction->referral;

        $packageName = $package->name ?? 'Unknown Package';
        $fullName = $user->full_name ?? 'Guest';
        $phoneNumber = $user->phone_number ?? ($user->phone ?? 'Unknown');
        $email = $user->email ?? 'Unknown';
        $price = $package->price_new ?? $transaction->amount;

        $this->notificationService->sendPaymentFailedNotification(
            $packageName,
            $fullName,
            $phoneNumber,
            $email,
            $price,
            null,
            $ref->ref_code ?? null,
            $ref->full_name ?? null,
            $ref->tg_username ?? null
        );

        Log::info("Payment expiry handled for Transaction ID {$transaction->id}. Notification sent.");
    }
}
