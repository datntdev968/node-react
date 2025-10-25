/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
    config.filebrowserBrowseUrl = "/admin/media?type=Files";
    config.filebrowserImageBrowseUrl = "/admin/media?type=Images";
    config.filebrowserUploadUrl = "/admin/media/upload?type=Files";
    config.filebrowserImageUploadUrl =
        "/admin/media/upload?type=Images";
};
