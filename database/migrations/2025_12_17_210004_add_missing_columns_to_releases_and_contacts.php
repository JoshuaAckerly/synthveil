<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add missing columns to releases table
        Schema::table('releases', function (Blueprint $table) {
            if (!Schema::hasColumn('releases', 'cover_image')) {
                $table->string('cover_image')->nullable()->after('release_date');
            }
            if (!Schema::hasColumn('releases', 'streaming_links')) {
                $table->json('streaming_links')->nullable()->after('cover_image');
            }
            if (!Schema::hasColumn('releases', 'is_featured')) {
                $table->boolean('is_featured')->default(false)->after('streaming_links');
            }
        });

        // Add missing columns to contacts table
        Schema::table('contacts', function (Blueprint $table) {
            if (!Schema::hasColumn('contacts', 'is_read')) {
                $table->boolean('is_read')->default(false)->after('message');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('releases', function (Blueprint $table) {
            $columnsToCheck = ['cover_image', 'streaming_links', 'is_featured'];
            foreach ($columnsToCheck as $column) {
                if (Schema::hasColumn('releases', $column)) {
                    $table->dropColumn($column);
                }
            }
        });

        Schema::table('contacts', function (Blueprint $table) {
            if (Schema::hasColumn('contacts', 'is_read')) {
                $table->dropColumn('is_read');
            }
        });
    }
};
