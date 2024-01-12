<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * @OA\Get(
     *     tags={"Product"},
     *     path="/api/products",
     *     @OA\Response(response="200", description="List Products.")
     * )
     */
    public function getList() {
        $data = Product::all();
        return response()->json($data)
            ->header('Content-Type', 'application/json; charset=utf-8');
    }
}
