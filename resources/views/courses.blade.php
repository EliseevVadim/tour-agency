@extends('layouts.app')

@section('content')
    <main-courses-content
        :initial-success-data='{!! json_encode(session("payment_success")) !!}'
        :initial-fail-data='{!! json_encode(session("payment_fail")) !!}'
    ></main-courses-content>
@endsection
