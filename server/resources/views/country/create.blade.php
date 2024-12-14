@extends('layouts.app')

@section('content')
<div class="container">&nbsp;
    <h1>Create New Country</h1>
    <form action="{{ route('country.store') }}" method="POST">
        @csrf

        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name" required>
        </div>

        <button type="submit" class="btn btn-success">Create Country</button>
        <a href="{{ route('country.index') }}" class="btn btn-secondary">Back to List</a>
    </form>
</div>
@endsection

