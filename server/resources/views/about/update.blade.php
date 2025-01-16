@extends('layouts.app')

@section('content')


<div class="container my-2">
    <h2 class="mb-4">About</h2>
    <hr>

    @if (session('success'))
        <div id="successAlert" class="alert alert-success alert-dismissible fade show" role="alert" aria-live="polite">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif
    @if ($errors->any())
        <div id="errorAlert" class="alert alert-danger alert-dismissible fade show" role="alert" aria-live="polite">
            <ul class="mb-0">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    <form id="editForm" action="{{ route('about.update') }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PATCH')

        <div class="row mb-3">
            <div class="col-md-2">
                <label for="name" class="form-label fw-bold">Name</label>
                <input type="text" class="form-control {{ $errors->has('name') ? 'is-invalid' : '' }}" id="name" name="name" value="{{ $data->name ?? '' }}" required>
                @if ($errors->has('name'))
                    <div class="invalid-feedback">{{ $errors->first('name') }}</div>
                @endif
            </div>
            <div class="col-md-2">
                <label for="image" class="form-label fw-bold">Image</label>
                <input type="file" class="form-control" id="image" name="image" accept="image/*">
                @if (!empty($data->image_path))
                    <img id="currentImage" src="{{ asset($data->image_path) }}" alt="Current Image" class="mt-2" width="200" style="object-fit: cover;">
                @endif
                <img id="imagePreview" src="#" alt="New Image Preview" class="mt-2" style="display: none; width: 200px; object-fit: cover;">
            </div>
            <div class="col-md-8">
                <label for="description" class="form-label fw-bold">Description</label>
                <textarea class="form-control {{ $errors->has('description') ? 'is-invalid' : '' }}" id="description" name="description" rows="7" required>{{ $data->description ?? '' }}</textarea>
                @if ($errors->has('description'))
                    <div class="invalid-feedback">{{ $errors->first('description') }}</div>
                @endif
            </div>
        </div>

        <div class="row">
            @for ($i = 1; $i <= 3; $i++)
                <div class="col-md-4 mb-3">
                    <label for="quot{{ $i }}_title" class="form-label fw-bold">Quotation {{ $i }} Title</label>
                    <input type="text" class="form-control" id="quot{{ $i }}_title" name="quot{{ $i }}_title" value="{{ $data->{'quot'.$i.'_title'} ?? '' }}">

                    <label for="quot{{ $i }}_desc" class="form-label fw-bold">Quotation {{ $i }} Description</label>
                    <textarea class="form-control" id="quot{{ $i }}_desc" name="quot{{ $i }}_desc" rows="7">{{ $data->{'quot'.$i.'_desc'} ?? '' }}</textarea>
                </div>
            @endfor
        </div>

        <button type="submit" class="btn btn-success mt-4" id="editBtn">Update About</button>
    </form>
</div>

<script>
    document.getElementById('editForm').addEventListener('submit', function(event) {
        const editBtn = document.getElementById('editBtn');
        editBtn.disabled = true;
        editBtn.textContent = "Updating...";
    });

    document.getElementById('image').addEventListener('change', function(event) {
        const [file] = event.target.files;
        const imagePreview = document.getElementById('imagePreview');
        if (file) {
            imagePreview.src = URL.createObjectURL(file);
            imagePreview.style.display = 'block';
        }
    });
</script>
@endsection
