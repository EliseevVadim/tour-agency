<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminOrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Order::query()->latest('id');

        if ($request->filled('search')) {
            $search = trim((string) $request->input('search'));

            $query->where(function ($q) use ($search) {
                $q->where('number', 'like', '%' . $search . '%')
                    ->orWhere('customer_name', 'like', '%' . $search . '%')
                    ->orWhere('customer_phone', 'like', '%' . $search . '%')
                    ->orWhere('customer_email', 'like', '%' . $search . '%')
                    ->orWhere('city', 'like', '%' . $search . '%')
                    ->orWhere('pickup_point_code', 'like', '%' . $search . '%')
                    ->orWhere('pickup_point_address', 'like', '%' . $search . '%');
            });
        }

        if ($request->filled('status')) {
            $query->where('status', (string) $request->input('status'));
        }

        if ($request->filled('delivery_mode')) {
            $query->where('delivery_mode', (string) $request->input('delivery_mode'));
        }

        $perPage = (int) $request->input('per_page', 20);

        if ($perPage < 1) {
            $perPage = 20;
        }

        if ($perPage > 100) {
            $perPage = 100;
        }

        $orders = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $orders,
        ]);
    }

    public function show(Order $order): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $order,
        ]);
    }

    public function close(Order $order): JsonResponse
    {
        if ($order->status === 'closed') {
            return response()->json([
                'success' => false,
                'errors' => ['Заказ уже закрыт'],
            ], 422);
        }

        $order->update([
            'status' => 'closed',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Заказ успешно закрыт',
            'data' => $order,
        ]);
    }
}
