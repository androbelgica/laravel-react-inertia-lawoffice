<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Client::query();

        $sortFields = request("sort_field", "created_at");
        $sortDirections = request("sort_direction", "desc");

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        $clients = $query->orderBy($sortFields, $sortDirections)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Client/Index', [
            "clients" => ClientResource::collection($clients),
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
        return inertia('Client/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        Client::create($data);

        return to_route('clients.index')->with('success', 'Client was added successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        // ...
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        return inertia('Client/Edit', [
            'client' => new ClientResource($client),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, Client $client)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        $client->update($data);

        return to_route('clients.index')
            ->with('success', "Client informations of \"$client->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $name = $client->name;
        try {
            $client->delete();
            return to_route('clients.index')->with(
                'success',
                "Client \"$name\" was deleted successfully"
            );
        } catch (QueryException $e) {
            return to_route('clients.index')->with([
                'success' => "Client \"$name\" cannot be deleted because it is referenced by other records.",
                'isException' => true,
            ]);
        }
    }
}
