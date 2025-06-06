<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class EmployeeController extends Controller
{
    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'gender' => ['required', Rule::in(['Male', 'Female', 'Other'])],
            'marital_status' => ['required', Rule::in(['Single', 'Married', 'Divorced', 'Widowed'])],
            'phone_number' => ['required', 'regex:/^[0-9+\-() ]{7,20}$/'],
            'email' => ['required', 'email', 'max:255'],
            'address' => ['required', 'string', 'max:500'],
            'date_of_birth' => ['required', 'date'],
            'nationality' => ['required', 'string', 'max:100'],
            'hire_date' => ['required', 'date'],
            'department' => ['required', 'string', 'max:100'],
        ]);

        $path = 'employees.json';

        // Check existing file
        if (Storage::exists($path)) {
            $json = Storage::get($path);
            $employees = json_decode($json, true);
            if (!is_array($employees)) {
                $employees = [];
            }
        } else {
            $employees = [];
        }

        // Append new record with timestamp and ID
        $validated['id'] = uniqid();
        $validated['created_at'] = now()->toDateTimeString();

        $employees[] = $validated;

        // Save to JSON
        Storage::put($path, json_encode($employees, JSON_PRETTY_PRINT));

        // Return response
        return response()->json([
            'message' => 'Employee added successfully',
            'data' => $validated,
        ], 201);
    }

    public function index()
    {
        $path = 'employees.json';

        if (!Storage::exists($path)) {
            return response()->json([], 200);
        }

        $json = Storage::get($path);
        $employees = json_decode($json, true);

        if(!is_array($employees)) {
            $employees = [];
        }

        return response()->json($employees, 200);
    }
}
