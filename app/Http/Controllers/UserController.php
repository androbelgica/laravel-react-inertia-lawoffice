<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Notification;
use App\Notifications\UserCreatedNotification;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sortFields = request("sort_field", "created_at");
        $sortDirections = request("sort_direction", "desc");

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('role')) {
            $query->where('role', request('role'));
        }

        if (request('email')) {
            $query->where('email', 'like', '%' . request('email') . '%');
        }

        $users = $query->orderBy($sortFields, $sortDirections)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('User/Index', [
            "users" => UserCrudResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'warning' => session('warning'), // Include warning message
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $password = $data['password'];
        $data['password'] = bcrypt($password); // Hash the password
        $data['is_default_password'] = true; // Set default password flag
        $user = User::create($data);

        $user->notify(new UserCreatedNotification($password));

        return to_route('users.index')->with('success', 'User was added successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // ...
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user' => new UserCrudResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']); // Hash the password if provided
        } else {
            unset($data['password']); // Remove password from data if not provided
        }
        $data['updated_by'] = Auth::id();

        $user->update($data);

        return to_route('users.index')
            ->with('success', "User informations of \"$user->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        try {
            $user->delete();
            return to_route('users.index')->with(
                'success',
                "User \"$name\" was deleted successfully"
            );
        } catch (\Illuminate\Database\QueryException $e) {
            if ($e->getCode() === '23000') { // Foreign key constraint violation
                return to_route('users.index')->with(
                    'warning',
                    "User \"$name\" cannot be deleted because it has dependent records."
                );
            }
            throw $e;
        }
    }
}
