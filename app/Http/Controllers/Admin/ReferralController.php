<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Referral;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class ReferralController extends Controller
{
    public function index()
    {
        $referrals = Referral::latest()->paginate(15);
        return view('admin.referrals.index', compact('referrals'));
    }

    public function storeApi(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20', 'unique:referrals,phone'],
            'email' => ['required', 'email', 'max:255', 'unique:referrals,email'],
            'tg_username' => ['nullable', 'string', 'max:100', 'unique:referrals,tg_username'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $data['ref_code'] = Referral::generateUniqueRefCode();
        $referral = Referral::create($data);

        return response()->json([
            'message' => 'Реферальная ссылка успешно создана. Код: ' . $referral->ref_code,
            'referral' => $referral
        ], 201);
    }

    public function indexApi(Request $request)
    {
        $perPage = $request->get('per_page', 20);
        $email = $request->get('email');
        $phone = $request->get('phone');

        $query = Referral::query()->withCount('transactions')->latest();

        if ($email) {
            $query->where('email', 'LIKE', '%' . $email . '%');
        }
        if ($phone) {
            $query->where('phone', 'LIKE', '%' . $phone . '%');
        }

        return $query->paginate($perPage);
    }

    public function getTransactionsForReferral($referralId, Request $request)
    {
        $statusFilter = $request->query('status');
        $referral = Referral::with('transactions')->findOrFail($referralId);
        $transactionsQuery = $referral->transactions();

        if ($statusFilter) {
            $transactionsQuery->where('status', $statusFilter);
        }

        $transactions = $transactionsQuery->get();

        return response()->json([
            'transactions' => $transactions
        ]);
    }

    public function destroyApi(Referral $referral)
    {
        $referral->delete();
        return response()->json(['message' => 'Реферальная ссылка удалена'], 200);
    }

    public function applyReferral(Request $request)
    {
        $request->validate([
            'ref_code' => 'required|string|exists:referrals,ref_code',
        ]);

        $refCode = $request->input('ref_code');
        $referral = Referral::where('ref_code', $refCode)->first();

        if ($referral) {
            Session::put('pending_ref_id', $referral->id);

            return response()->json([
                'message' => 'Реферальная привязка установлена.',
                'ref_id' => $referral->id
            ]);
        }

        return response()->json(['message' => 'Реферальный код не найден'], 404);
    }

}
