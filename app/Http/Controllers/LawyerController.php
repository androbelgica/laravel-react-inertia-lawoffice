<?php

namespace App\Http\Controllers;

use App\Models\Lawyer;
use App\Http\Resources\LawyerResource;
use App\Http\Requests\StoreLawyerRequest;
use App\Http\Requests\UpdateLawyerRequest;

class LawyerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Lawyer::query();

        $sortFields = request("sort_field", "created_at");
        $sortDirections = request("sort_direction", "desc");

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        $lawyers = $query->orderBy($sortFields, $sortDirections)
            ->paginate(10)
            ->onEachSide(1);


        return inertia('Lawyer/Index', [
            "lawyers" => LawyerResource::collection($lawyers),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLawyerRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Lawyer $lawyer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lawyer $lawyer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLawyerRequest $request, Lawyer $lawyer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lawyer $lawyer)
    {
        //
    }
}
