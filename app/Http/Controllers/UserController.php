<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * @param User $user
     */
    public function __construct(private User $user)
    {
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        return Inertia::render('Users/Index', [
            'users' => $this->user->select(['id', 'name', 'email'])
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('name', 'like', '%' . $search . '%');
                })
                ->paginate(2)
                ->withQueryString(),
            'filters'=> $request->only(['search'])
        ]);
    }

    /**
     * @return Response
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * @param Request $request
     * @return Application|RedirectResponse|Redirector
     */
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => ['required','min:3'],
            'email' => ['required','email','unique:users'],
            'password' => ['required','min:6'],
        ]);

        User::create($attributes);

        return redirect('/users');
    }

    /**
     * @param $id
     * @return Response
     */
    public function edit($id)
    {
        $user = $this->user->findOrFail($id);

        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    /**
     * @param Request $request
     * @param $id
     * @return Application|RedirectResponse|Redirector
     */
    public function update(Request $request, $id)
    {
        $user = $this->user->findOrFail($id);

        $attributes = $request->validate([
            'name' => ['required','min:3'],
            'email' => ['required','email','unique:users,' . $user->id],
        ]);

        $user->update($attributes);

        return redirect('/users');
    }

    /**
     * @param $id
     * @return Application|RedirectResponse|Redirector
     */
    public function destroy($id)
    {
        $user = $this->user->findOrFail($id);

        if ($user->id !== Auth::user()->id) {
            $user->delete();
        }

        return redirect('/users');
    }
}
