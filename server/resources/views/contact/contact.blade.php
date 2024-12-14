@extends('layouts.app')

@section('content')
<div class="container">&nbsp;
    <h1>Contact</h1>
    <hr>
    @if (session('success'))
        <div id="successAlert" class="alert alert-success alert-dismissible fade show" role="alert">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    <form action="{{ route('contact.update') }}" method="POST">
        @csrf
        @method('PATCH')

        <div class="mb-3">
            <label for="address" class="form-label fw-bold">Address</label>
            <input type="text" class="form-control" id="address" name="address" value="{{ $data->address }}" required>
        </div>

        <div class="mb-3">
            <label for="phone" class="form-label fw-bold">Phone</label>
            <input type="text" class="form-control" id="phone" name="phone" value="{{ $data->phone }}" required>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label fw-bold">Email</label>
            <input type="email" class="form-control" id="email" name="email" value="{{ $data->email }}" required>
        </div>
        <div class="mb-3">
            <label for="map_address" class="form-label fw-bold">Map Address (Embed a map)</label>
            <textarea class="form-control" id="map_address" name="map_address" rows="4" placeholder="Enter map address or iframe embed code" required>{{ $data->map_address }}</textarea>
        </div>

        <button type="submit" class="btn btn-success">Update Contact</button>
    </form>
</div>
@endsection

