<template>
    <div :class="$style.root" v-html="autop(content)" />
</template>
<script setup lang="ts">
import { autop } from '@wordpress/autop'

defineProps<{
    content: string
}>()
</script>
<style lang="scss" module>
.root :global {
    /*
    Got these styles right from WordPress Dashboard sources

    https://github.com/WordPress/wordpress-develop/blob/6.3/src/js/_enqueues/vendor/tinymce/skins/wordpress/wp-content.css

    And deleted some useless
    */

    pre {
        font-family: Consolas, Monaco, monospace;
    }

    td,
    th {
        font-family: inherit;
        font-size: inherit;
    }

    /* For emoji replacement images */
    img.emoji {
        display: inline !important;
        border: none !important;
        height: 1em !important;
        width: 1em !important;
        margin: 0 0.07em !important;
        vertical-align: -0.1em !important;
        background: none !important;
        padding: 0 !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
    }

    img {
        height: auto;
        max-width: 100%;
    }

    .wp-caption {
        margin: 0; /* browser reset */
        max-width: 100%;
    }

    dl.wp-caption dt.wp-caption-dt img {
        display: inline-block;
        margin-bottom: -1ex;
    }

    dl.wp-caption,
    dl.wp-caption * {
        -webkit-user-drag: none;
    }

    .wp-caption-dd {
        font-size: 14px;
        padding-top: 0.5em;
        margin: 0; /* browser reset */
    }

    .aligncenter {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .alignleft {
        float: left;
        margin: 0.5em 1em 0.5em 0;
    }

    .alignright {
        float: right;
        margin: 0.5em 0 0.5em 1em;
    }

    audio,
    video,
    embed {
        display: -moz-inline-stack;
        display: inline-block;
    }

    audio {
        visibility: hidden;
    }

    .gallery a {
        cursor: default;
    }

    .gallery {
        margin: auto -6px;
        padding: 6px 0;
        line-height: 1;
        overflow-x: hidden;
    }

    .gallery .gallery-item {
        float: left;
        margin: 0;
        text-align: center;
        padding: 6px;
        box-sizing: border-box;
    }

    .gallery .gallery-caption,
    .gallery .gallery-icon {
        margin: 0;
    }

    .gallery .gallery-caption {
        font-size: 13px;
        margin: 4px 0;
    }

    .gallery-columns-1 .gallery-item {
        width: 100%;
    }

    .gallery-columns-2 .gallery-item {
        width: 50%;
    }

    .gallery-columns-3 .gallery-item {
        width: 33.333%;
    }

    .gallery-columns-4 .gallery-item {
        width: 25%;
    }

    .gallery-columns-5 .gallery-item {
        width: 20%;
    }

    .gallery-columns-6 .gallery-item {
        width: 16.665%;
    }

    .gallery-columns-7 .gallery-item {
        width: 14.285%;
    }

    .gallery-columns-8 .gallery-item {
        width: 12.5%;
    }

    .gallery-columns-9 .gallery-item {
        width: 11.111%;
    }

    .gallery img {
        max-width: 100%;
        height: auto;
        border: none;
        padding: 0;
    }

    .rtl .gallery .gallery-item {
        float: right;
    }
}
</style>
