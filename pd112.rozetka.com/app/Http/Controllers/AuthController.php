<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Intervention\Image\Image;
use Symfony\Component\HttpFoundation\Response;
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *   path="/api/login",
     *   tags={"Auth"},
     *   summary="Login",
     *   operationId="login",
     *   @OA\RequestBody(
     *     required=true,
     *     description="User login data",
     *     @OA\MediaType(
     *       mediaType="application/json",
     *       @OA\Schema(
     *         required={"email", "password"},
     *         @OA\Property(property="email", type="string"),
     *         @OA\Property(property="password", type="string"),
     *       )
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Success",
     *     @OA\MediaType(
     *       mediaType="application/json"
     *     )
     *   ),
     *   @OA\Response(
     *     response=401,
     *     description="Unauthenticated"
     *   ),
     *   @OA\Response(
     *     response=400,
     *     description="Bad Request"
     *   ),
     *   @OA\Response(
     *     response=404,
     *     description="Not Found"
     *   ),
     *   @OA\Response(
     *     response=403,
     *     description="Forbidden"
     *   )
     * )
     */
    public function login(Request $request)
    {
        $validation = Validator::make($request->all(),[
            'email'=> 'required|email',
            'password'=> 'required|string|min:6'
        ], [
            'email.required' => 'Пошта є побов\'язковим.',
            'email.email' => 'Пошта є невалідною.',
            'password.required' => 'Пароль не може буть пустим.',
            'password.min' => 'Довжина пароля має бути мінімум 6 символів.',
        ]);
        if($validation->fails()) {
            return response()->json($validation->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        if(!$token = auth()->attempt($validation->validated())) {
            return response()->json(['error'=>'Не вірно вказано дані!'], Response::HTTP_UNAUTHORIZED);
        }
        return response()->json(['token'=>$token], Response::HTTP_OK);
    }
    /**
     * @OA\Post(
     *     tags={"Auth"},
     *     path="/api/register",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"email", "lastName", "name", "phone", "image", "password", "password_confirmation"},
     *                 @OA\Property(
     *                     property="image",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="email",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="lastName",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="phone",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password_confirmation",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Add Category.")
     * )
     */
    public function register(Request $request) {
        // Get the base64-encoded image data from the request
        $base64Image = $request->input('image');
        // Remove the "data:image/png;base64," prefix from the base64 string
        $base64Image = str_replace('data:image/png;base64,', '', $base64Image);
        // Decode the base64 string
        $imageData = base64_decode($base64Image);
        $imageName = uniqid().".webp";
        $sizes = [50,150,300,600,1200];
        // create image manager with desired driver
        $manager = new ImageManager(new Driver());
        foreach ($sizes as $size) {
            $fileSave = $size."_".$imageName;
            //$imageRead = $manager->read($imageData);
            $imageRead = Image::make($imageData);
            $imageRead->scale(width: $size);
            $path=public_path('upload/'.$fileSave);
            $imageRead->toWebp()->save($path);
        }
        return response()->json(['token'=>$imageName], Response::HTTP_OK);
    }
}
