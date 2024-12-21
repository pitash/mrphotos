@extends('layouts.app')

@section('content')
{{-- <h2 class="mt-4">Gallery List</h2>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
    <li class="breadcrumb-item active">Gallery</li>
</ol> --}}

<div class="d-flex justify-content-between align-items-center mt-4 mb-4">
    <h2 class="fw-bold text-primary mb-0">
        <i class="fas fa-images me-2"></i> Gallery List
    </h2>
    <div>
        <button type="button" class="btn btn-gradient-primary shadow-sm d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#createModal" style="background: linear-gradient(135deg, #4e73df, #224abe); border: none;">
            <i class="fas fa-plus-circle me-2"></i> Create Gallery
        </button>
    </div>
</div>
@if (session('success'))
    <div id="successAlert" class="alert alert-success alert-dismissible fade show" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif
<ol class="breadcrumb bg-light p-3 rounded shadow-sm">
    <li class="breadcrumb-item">
        <a href="#" class="text-decoration-none text-primary">
            <i class="fas fa-tachometer-alt me-1"></i> Dashboard
        </a>
    </li>
    <li class="breadcrumb-item active text-muted">
        <i class="fas fa-images me-1"></i> Gallery
    </li>
</ol>
<div class="card mb-4">
    <div class="card-header">
        <i class="fas fa-table me-1"></i>
        Gallery List
    </div>
    <div class="card-body">
        <table id="datatablesSimple">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Country</th>
                    {{-- <th>Status</th> --}}
                    <th>Actions</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Country</th>
                    {{-- <th>Status</th> --}}
                    <th>Actions</th>
                </tr>
            </tfoot>
            <tbody>
                @foreach ($datas as $data)
                <tr>
                    <td>{{ $data->title }}</td>
                    <td>{{ $data->description }}</td>
                    <td>
                        @if ($data->image_path)
                            <img src="{{ asset('storage/' . $data->image_path) }}" alt="Gallery Image" height="100" width="200">
                        @else
                            No Image
                        @endif
                    </td>
                    <td>{{ $data->country->name }}</td>
                    <td>
                        <form action="{{ route('gallery.toggleStatus', $data->id) }}" method="POST" style="display: inline;">
                            @csrf
                            @method('PATCH')

                            @if ($data->is_active)
                                <button type="submit" class="btn btn-danger btn-sm">Deactivate</button>
                            @else
                                <button type="submit" class="btn btn-success btn-sm">Activate</button>
                            @endif
                        </form>

                        <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editData({{ $data->id }})">
                            Edit
                        </button>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>

<!-- Create Modal -->
<div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createModalLabel">Create New Gallery</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="createForm" action="{{ route('gallery.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf

                    <div class="mb-3">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="title" name="title" required>
                        @error('title')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <input type="text" class="form-control" id="description" name="description" required>
                        @error('description')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="country_id" class="form-label">Country</label>
                        <select class="form-select" id="country_id" name="country_id" required>
                            <option value="">Select a Country</option>
                            @foreach ($countries as $country)
                                <option value="{{ $country->id }}">{{ $country->name }}</option>
                            @endforeach
                        </select>
                        @error('country_id')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="image" class="form-label">Image</label>
                        <input type="file" class="form-control" id="image" name="image[]" multiple required accept="image/*">
                        {{-- <input type="file" class="form-control" id="image" name="image" required accept="image/*"> --}}
                        @error('image')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                        @error('image.*')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- Display selected images -->
                    <div id="image-preview" class="mt-3"></div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success" id="createBtn">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Edit Modal -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Edit Gallery</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- Edit Form -->
                <form id="editForm" method="POST" enctype="multipart/form-data">
                    @csrf
                    {{-- @method('PATCH') --}}
                    @method('PUT')

                    <div class="mb-3">
                        <label for="edit_title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="edit_title" name="title" required>
                    </div>

                    <div class="mb-3">
                        <label for="edit_description" class="form-label">Description</label>
                        <input type="text" class="form-control" id="edit_description" name="description" required>
                    </div>

                    <div class="mb-3">
                        <label for="edit_country_id" class="form-label">Country</label>
                        <select class="form-select" id="edit_country_id" name="country_id" required>
                            @foreach ($countries as $country)
                                <option value="{{ $country->id }}">{{ $country->name }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="edit_image" class="form-label">Image</label>
                        <input type="file" class="form-control" id="edit_image" name="image" accept="image/*">
                        <div id="main-image-preview" class="mt-2"></div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success" id="editBtn">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
    document.getElementById("image").addEventListener("change", function(event) {
        const files = event.target.files;
        const previewContainer = document.getElementById("image-preview");
        previewContainer.innerHTML = ""; // Clear previous previews

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.createElement("img");
                imgElement.src = e.target.result;
                imgElement.classList.add("img-thumbnail", "me-2");
                imgElement.style.maxWidth = "100px";
                imgElement.style.maxHeight = "100px";
                previewContainer.appendChild(imgElement);
            };
            reader.readAsDataURL(file);
        });
    });

    // load gallery data into the modal
    function editData(dataId) {
        fetch(`/gallery/${dataId}/edit`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('edit_title').value = data.title;
                document.getElementById('edit_description').value = data.description;
                document.getElementById('edit_country_id').value = data.country_id;
                document.getElementById('edit_image').value = '';

                const mainImageContainer = document.getElementById('main-image-preview');
                mainImageContainer.innerHTML = "";
                if (data.main_image) {
                    const mainImg = document.createElement("img");
                    mainImg.src = data.main_image;
                    mainImg.classList.add("img-thumbnail");
                    mainImg.style.maxWidth = "100px";
                    mainImg.style.maxHeight = "100px";
                    mainImageContainer.appendChild(mainImg);
                }

                // Set the form action dynamically
                document.getElementById('editForm').action = `/gallery/${dataId}`;
            })
            .catch(error => console.error('Error:', error));
    }
    // Disable buttons on form submit
    document.getElementById('createForm').addEventListener('submit', function(event) {
        const createBtn = document.getElementById('createBtn');
        createBtn.disabled = true;
        createBtn.textContent = "Saving...";
    });

    document.getElementById('editForm').addEventListener('submit', function(event) {
        const editBtn = document.getElementById('editBtn');
        editBtn.disabled = true;
        editBtn.textContent = "Updating...";
    });

    // Image preview on file input change
    document.getElementById('edit_image').addEventListener('change', function(event) {
        const mainImageContainer = document.getElementById('main-image-preview');
        mainImageContainer.innerHTML = "";

        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const mainImg = document.createElement("img");
                mainImg.src = e.target.result;
                mainImg.classList.add("img-thumbnail");
                mainImg.style.maxWidth = "100px";
                mainImg.style.maxHeight = "100px";
                mainImageContainer.appendChild(mainImg);
            };
            reader.readAsDataURL(file);
        }
    });



</script>

@endsection

