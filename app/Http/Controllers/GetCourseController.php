<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\PaymentTransaction;
use App\Models\Referral;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

class GetCourseController extends Controller
{
    public function handleData(Request $request)
    {
        $data = $request->all();
        Log::info(json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        $email = $data;
        $userData = [
            'full_name' => $data['full_name'],
            'phone_number' => $data['phone_number'],
            'agrees_to_marketing' => true,
            'password' => Hash::make(Str::random(12)),
        ];
        $user = User::updateOrCreate(['email' => $email], $userData);

        $packageId = $data['package'];
        $package = Package::query()->where('id_getCourse', $packageId)->firstOrFail();

        $paymentTransaction = PaymentTransaction::create([
            'user_id' => $user->id,
            'package_id' => $package->id ?? null,
            'amount' => $package->price_new ?? null,
            'status' => 'pending',
        ]);

        $refName = $data['ref'];
        $ref = Referral::query()->where('ref_code', $refName)->firstOrFail();

        $refId = $ref->id;
        if ($refId) {
            $paymentTransaction->ref_id = $refId;
            $paymentTransaction->save();
        }
        return response()->json(['status' => 'success', 'message' => 'Data processed'], 200);
    }
}
