<?php

namespace App\Http\Controllers;

use App\Models\Lawsuit;
use App\Models\Client;
use App\Models\Lawyer;
use App\Models\User;
use App\Http\Resources\LawsuitResource;
use App\Http\Resources\LawsuitTaskResource;
use App\Http\Resources\ClientResource;
use App\Http\Resources\LawyerResource;
use App\Http\Resources\UserResource;
use App\Http\Requests\StoreLawsuitRequest;
use App\Http\Requests\UpdateLawsuitRequest;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

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
            'success' => session('success'),
            'isException' => session('isException', false),
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {


        return inertia('Lawsuit/Create', [
            'clients' => Client::all(),
            'lawyers' => Lawyer::all(),
            'users' => User::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLawsuitRequest $request)
    {

        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();


        Lawsuit::create($data);


        return to_route('lawsuits.index')->with('success', 'Lawsuit created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Lawsuit $lawsuit)
    {

        $query = $lawsuit->lawsuit_tasks();

        $sortFields = request("sort_field", "created_at");
        $sortDirections = request("sort_direction", "desc");

        if (request('task_name')) {
            $query->where('task_name', 'like', '%' . request('task_name') . '%');
        }

        if (request('priority')) {
            $query->where('priority', 'like', '%' . request('priority') . '%');
        }

        if (request('status')) {
            $query->where('status', 'like', '%' . request('status') . '%');
        }


        $lawsuit_tasks = $query->orderBy($sortFields, $sortDirections)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Lawsuit/Show', [
            'lawsuit' => new LawsuitResource($lawsuit),
            "lawsuit_tasks" => LawsuitTaskResource::collection($lawsuit_tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lawsuit $lawsuit)
    {
        $clients = Client::query()->orderBy('name', 'asc')->get();
        $lawyers = Lawyer::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();
        return inertia('Lawsuit/Edit', [
            'lawsuit' => new LawsuitResource($lawsuit),
            'clients' => ClientResource::collection($clients),
            'lawyers' => LawyerResource::collection($lawyers),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLawsuitRequest $request, Lawsuit $lawsuit)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        $lawsuit->update($data);

        return to_route('lawsuits.index')->with('success', 'Lawsuit updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lawsuit $lawsuit)
    {
        $title = $lawsuit->title;
        try {
            $lawsuit->delete();
            return to_route('lawsuits.index')->with(
                'success',
                "Lawsuit \"$title\" was deleted successfully"
            );
        } catch (QueryException $e) {
            return to_route('lawsuits.index')->with([
                'success' => "Lawsuit \"$title\" cannot be deleted because it is referenced by other records.",
                'isException' => true,
            ]);
        }
    }
}
