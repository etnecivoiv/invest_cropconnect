<?php

namespace App\Services;

class SeoMeta
{
    private static $metaData = [];

    /**
     * Find, Set, Get the seo option data directly from the database
     * @return array
     */
    public static function init(
        string $option_key,
        bool $decode = true,
        bool $locale = false,
        bool $associative = false
    ): array {
        $seo = (array) get_option($option_key, $decode, $locale, $associative);
        self::set($seo);
        return self::get();
    }

     /**
     * Set the seo meta data
     * @return array
     */
    public static function set(string|array $key, ?string $value = null)
    {
        if (is_array($key)) {
            self::$metaData = $key;
        } else {
            self::$metaData[$key] = $value;
        }

        return static::get();
    }

     /**
     * patch the seo meta data
     * @return array
     */
    public static function patch(array $data)
    {
        foreach ($data as $key => $value) {
            self::set($key, $value);
        }
        return static::get();
    }

     /**
     * Get the seo meta data
     * @return array
     */
    public static function get(?string $key = null)
    {
        if ($key) {
            return isset(self::$metaData[$key]) ? self::$metaData[$key] : null;
        }
        return self::$metaData;
    }


     /**
     * create the seo meta data
     * @return array
     */
    public static function clear(?string $key = null)
    {
        if ($key) {
            self::set($key, null);
        }

        return static::get();
    }
}
