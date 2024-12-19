@extends('layouts.app')

@section('content')
<div class="d-flex justify-content-between align-items-center mt-4 mb-4">
    <h2 class="fw-bold text-primary mb-0">
        <i class="fas fa-list-alt me-2"></i> Blog List
    </h2>
    <div>
        <button type="button" class="btn btn-gradient-primary shadow-sm d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#createBlogModal" style="background: linear-gradient(135deg, #4e73df, #224abe); border: none;">
            <i class="fas fa-plus-circle me-2"></i> Create Blog
        </button>
    </div>
</div>

<ol class="breadcrumb bg-light p-3 rounded shadow-sm">
    <li class="breadcrumb-item">
        <a href="#" class="text-decoration-none text-primary">
            <i class="fas fa-tachometer-alt me-1"></i> Dashboard
        </a>
    </li>
    <li class="breadcrumb-item active text-muted">
        <i class="fas fa-blog me-1"></i> Blog
    </li>
</ol>

<div class="card mb-4">

    <div class="card-header">
        <i class="fas fa-table me-1"></i>
        Blog List
    </div>

    <div class="card-body">
        <table id="datatablesSimple">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Country</th>
                    <th>Category</th>
                    <th>Published Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Country</th>
                    <th>Category</th>
                    <th>Published Date</th>
                    <th>Actions</th>
                </tr>
            </tfoot>
            <tbody>
                @foreach ($datas as $data)
                <tr>
                    <td>{{ $data->title }}</td>
                    <td>{{ $data->description }}</td>
                    <td>
                        @if ($data->image)
                            <img src="{{ asset('storage/' . $data->image) }}" alt="Blog Image" height="100" width="200">
                        @else
                            No Image
                        @endif
                    </td>
                    <td>{{ $data->country->name }}</td>
                    <td>{{ $data->category->name }}</td>
                    <td>{{ $data->published_date ? $data->published_date->format('Y-m-d') : 'N/A' }}</td>
                    <td>
                        <form action="{{ route('blog.toggleStatus', $data->id) }}" method="POST" style="display: inline;">
                            @csrf
                            @method('PATCH')

                            @if ($data->is_active)
                                <button type="submit" class="btn btn-danger btn-sm">Deactivate</button>
                            @else
                                <button type="submit" class="btn btn-success btn-sm">Activate</button>
                            @endif
                        </form>

                        <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editBlogModal" onclick="editBlog({{ $data->id }})">
                            Edit
                        </button>
                    </td>
                    {{-- <td>
                        <a href="#" class="btn btn-warning btn-sm">Edit</a>
                        <a href="{{ route('blog.edit', $data->id) }}" class="btn btn-warning btn-sm">Edit</a>

                    </td> --}}
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>


</div>

<!-- Create Blog Modal -->
<div class="modal fade" id="createBlogModal" tabindex="-1" aria-labelledby="createBlogModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createBlogModalLabel">Create New Blog</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="createBlogForm" action="{{ route('blog.store') }}" method="POST" enctype="multipart/form-data">
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
                        <label for="category_id" class="form-label">Category</label>
                        <select class="form-select" id="category_id" name="category_id" required>
                            <option value="">Select a Category</option>
                            @foreach ($categories as $data)
                                <option value="{{ $data->id }}">{{ $data->name }}</option>
                            @endforeach
                        </select>
                        @error('country_id')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="image" class="form-label">Image</label>
                        <input type="file" class="form-control" id="image" name="image" required accept="image/*">
                        @error('image')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="galleries" class="form-label">Thumbnail Images</label>
                        <input type="file" class="form-control" id="galleries" name="galleries[]" required accept="image/*" multiple>
                        @error('galleries')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <!-- Display selected images as thumbnails -->
                    <div id="image-preview" class="mt-3"></div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success">Create Blog</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Edit Blog Modal -->
<div class="modal fade" id="editBlogModal" tabindex="-1" aria-labelledby="editBlogModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editBlogModalLabel">Edit Blog</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- Edit Form -->
                <form id="editBlogForm" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('PATCH')

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
                            {{-- <option value="">Select a Country</option> --}}
                            @foreach ($countries as $country)
                                <option value="{{ $country->id }}">{{ $country->name }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="edit_category_id" class="form-label">Category</label>
                        <select class="form-select" id="edit_category_id" name="category_id" required>
                            {{-- <option value="">Select a Category</option> --}}
                            @foreach ($categories as $data)
                                <option value="{{ $data->id }}">{{ $data->name }}</option>
                            @endforeach
                        </select>
                        @error('country_id')
                            <div class="text-danger">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="edit_image" class="form-label">Image</label>
                        <input type="file" class="form-control" id="edit_image" name="image" accept="image/*">
                        <div id="main-image-preview" class="mt-2"></div> <!-- Main image preview here -->
                    </div>

                    <div class="mb-3">
                        <label for="edit_galleries" class="form-label">Thumbnail Images</label>
                        <input type="file" class="form-control" id="edit_galleries" name="galleries[]" accept="image/*" multiple>
                        <div id="gallery-preview" class="mt-2"></div> <!-- Gallery images preview here -->
                    </div>

                    <!-- Display existing gallery images as thumbnails -->
                    <div id="edit-gallery-preview" class="mt-3">
                        <!-- Thumbnails will be shown here -->
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>




<script>
    document.getElementById("galleries").addEventListener("change", function(event) {
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

    function editBlog(blogId) {
        fetch(`/blog/${blogId}/edit`)
            .then(response => response.json())
            .then(data => {
                // Set form fields with the blog data
                document.getElementById('edit_title').value = data.title;
                document.getElementById('edit_description').value = data.description;
                document.getElementById('edit_country_id').value = data.country_id;
                document.getElementById('edit_category_id').value = data.category_id;
                document.getElementById('edit_image').value = '';
                document.getElementById('edit_galleries').value = '';

                // Display the main image
                const mainImageContainer = document.getElementById('main-image-preview');
                mainImageContainer.innerHTML = "";
                if (data.main_image) {
                    const mainImg = document.createElement("img");
                    mainImg.src = `/storage/${data.main_image}`;
                    mainImg.classList.add("img-thumbnail");
                    mainImg.style.maxWidth = "100px";
                    mainImg.style.maxHeight = "100px";
                    mainImageContainer.appendChild(mainImg);
                }

                // Display gallery images
                const galleriesContainer = document.getElementById('edit-gallery-preview');
                galleriesContainer.innerHTML = "";
                if (data.galleries && Array.isArray(data.galleries)) {
                    data.galleries.forEach(imagePath => {
                        const img = document.createElement("img");
                        // Correcting the gallery image path by prepending '/storage/'
                        const imageUrl = `/storage/${imagePath.replace(/\\/g, '/')}`;
                        img.src = imageUrl;
                        img.classList.add("img-thumbnail", "me-2");
                        img.style.maxWidth = "100px";
                        img.style.maxHeight = "100px";
                        galleriesContainer.appendChild(img);
                    });
                } else {
                    galleriesContainer.innerHTML = "No gallery images available.";
                }

                document.getElementById('editBlogForm').action = `/blog/${blogId}`;
            })
            .catch(error => console.error('Error:', error));
    }

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
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    });

    // Handle new gallery images selection
    document.getElementById('edit_galleries').addEventListener('change', function(event) {
        const galleriesContainer = document.getElementById('edit-gallery-preview');
        galleriesContainer.innerHTML = "";

        const files = event.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement("img");
                    img.src = e.target.result; // Use the FileReader result as the image source
                    img.classList.add("img-thumbnail", "me-2");
                    img.style.maxWidth = "100px";
                    img.style.maxHeight = "100px";
                    galleriesContainer.appendChild(img);
                };
                reader.readAsDataURL(file); // Read the file as a data URL
            });
        }
    });






</script>

@endsection


