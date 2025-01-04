<?php

namespace App\Http\Controllers;

use App\Models\Lawsuit;
use App\Http\Requests\StoreLawsuitRequest;
use App\Http\Requests\UpdateLawsuitRequest;

class LawsuitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
