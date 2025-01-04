<?php

namespace App\Http\Controllers;

use App\Models\Lawsuit;
use App\Http\Resources\LawsuitResource;
use App\Http\Requests\StoreLawsuitRequest;
use App\Http\Requests\UpdateLawsuitRequest;

class LawsuitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Lawsuit::query();

        $sortFields = request("sort_field", "created_at");
        $sortDirections = request("sort_direction", "desc");

        if (request('title')) {
            $query->where('title', 'like', '%' . request('title') . '%');
        }

        if (request('case_number')) {
            $query->where('case_number', 'like', '%' . request('case_number') . '%');
        }

        if (request('case_type')) {
            $query->where('case_type', 'like', '%' . request('case_type') . '%');
        }

        if (request('case_status')) {
            $query->where('case_status', 'like', '%' . request('case_status') . '%');
        }

        $lawsuits = $query->orderBy($sortFields, $sortDirections)
            ->paginate(10)
            ->onEachSide(1);


        return inertia('Lawsuit/Index', [
            "lawsuits" => LawsuitResource::collection($lawsuits),
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
    public function store(StoreLawsuitRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Lawsuit $lawsuit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lawsuit $lawsuit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLawsuitRequest $request, Lawsuit $lawsuit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lawsuit $lawsuit)
    {
        //
    }
}
