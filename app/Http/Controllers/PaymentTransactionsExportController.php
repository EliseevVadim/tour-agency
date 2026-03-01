<?php

namespace App\Http\Controllers;

use App\Exports\TransactionsExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class PaymentTransactionsExportController extends Controller
{
    public function export(Request $request)
    {
        $request->validate([
            'filters.status' => 'nullable|in:succeeded,pending,canceled',
            'filters.package_id' => 'nullable|string',
            'filters.date_from' => 'nullable|date_format:Y-m-d',
            'filters.date_to' => 'nullable|date_format:Y-m-d',
            'columns' => 'required|array|min:1|max:30',
            'columns.*' => 'string',
            'cancelled_or_pending_with_paid_referral' => 'nullable|boolean',
        ]);

        $allowed = array_keys(TransactionsExport::columnsMap());
        $columns = array_values(array_intersect($request->input('columns', []), $allowed));

        if (count($columns) === 0) {
            return response()->json(['message' => 'Выберите хотя бы один столбец'], 422);
        }

        $fileName = 'transactions_' . now()->format('Y-m-d_H-i') . '.xlsx';
        $filters = $request->input('filters', []);
        $special = (bool) ($filters['cancelled_or_pending_with_paid_referral'] ?? false);

        return Excel::download(
            new TransactionsExport(
                $columns,
                $filters['status'] ?? null,
                $filters['package_id'] ?? null,
                $filters['date_from'] ?? null,
                $filters['date_to'] ?? null,
                $special
            ),
            $fileName
        );
    }
}
