import React, { useState } from "react";
import { Button, Input, Menu } from "@mantine/core";
import {
  FilePlus2,
  Folder,
  RefreshCcw,
  Search,
  Upload,
  Image as ImageIcon,
  ChevronDown,
  ArrowDownAZ,
  ArrowUpAZ,
  ArrowRightFromLine,
  Hand,
  Eye,
  LayoutPanelLeft,
  Rows2,
  ImageDown,
  Image,
  CircleCheckBig,
} from "lucide-react";

const items = [
  {
    id: 1,
    type: "folder",
    name: "Products",
    uploadedAt: "2025-08-10",
    modifiedAt: "2025-08-14",
  },
  {
    id: 2,
    type: "image",
    name: "banner.jpg",
    fullUrl:
      "https://xuonginhanoi.vn/files/banner-quang-cao-du-khach-hang-hieu-qua-3.jpg",
    size: "1.2 MB",
    uploadedAt: "2025-08-13",
    modifiedAt: "2025-08-15",
    alt: "Sample banner",
    width: 300,
    height: 200,
  },
  {
    id: 3,
    type: "folder",
    name: "Sliders",
    uploadedAt: "2025-08-12",
    modifiedAt: "2025-08-15",
  },
  {
    id: 4,
    type: "image",
    name: "logo.png",
    fullUrl: "https://placehold.co/150x150",
    size: "250 KB",
    uploadedAt: "2025-08-11",
    modifiedAt: "2025-08-14",
    alt: "Website logo",
    width: 150,
    height: 150,
  },
];

export default function Media() {
  const [active, setActive] = useState("grid");
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const insertImageToCkeditor = () => {
    if (!selectedItem) return;

    // Nếu là folder thì bỏ qua
    if (selectedItem.type === "folder") {
      alert("Vui lòng chọn một file ảnh, không phải thư mục.");
      return;
    }

    const funcNum = new URLSearchParams(window.location.search).get(
      "CKEditorFuncNum"
    );
    if (!funcNum) {
      alert("Không tìm thấy CKEditorFuncNum trong URL");
      return;
    }

    window.opener.CKEDITOR.tools.callFunction(funcNum, selectedItem.fullUrl);
    window.close();
  };

  return (
    <>
      {/* Header */}
      <div className="p-3 flex justify-center items-center gap-1">
        <img
          src="/images/folder.png"
          alt="Folder"
          className="w-10 h-10 inline-block"
        />
        <h1 className="font-semibold text-2xl">Media gallery</h1>
      </div>

      {/* Toolbar */}
      <div className="border-gray-200 border bg-gray-100 p-3 flex justify-between items-center">
        <div className="flex gap-3">
          <Button
            variant="filled"
            color="#206bc4"
            size="md"
            style={{ padding: "10px 15px" }}
          >
            <Upload className="me-2" /> Upload
          </Button>
          <Button
            variant="filled"
            color="#206bc4"
            size="md"
            style={{ padding: "10px" }}
          >
            <FilePlus2 />
          </Button>
          <Button
            variant="filled"
            color="#206bc4"
            size="md"
            style={{ padding: "10px" }}
          >
            <RefreshCcw />
          </Button>
        </div>

        <div>
          <Input
            placeholder="Search in current folder"
            size="md"
            w={300}
            leftSection={<Search size={16} className="text-gray-500" />}
          />
        </div>
      </div>

      {/* Breadcrumb & Actions */}
      <div className="flex justify-between p-3 border-b border-gray-200">
        <div className="text-sm text-gray-600 flex items-center gap-1">
          <span className="cursor-pointer hover:underline flex items-center gap-1">
            <ImageIcon className="w-5 h-5" /> All media
          </span>
          <span>/</span>
          <span className="text-gray-800 font-medium flex items-center gap-1 ms-2">
            <Folder className="w-5 h-5" /> folder
          </span>
        </div>

        <div className="flex gap-3">
          {/* Sort Menu */}
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button
                variant="outline"
                rightSection={<ChevronDown size={16} />}
                size="md"
                color="#206bc4"
                style={{ padding: "10px 15px" }}
              >
                <small className="me-3">A-Z</small> Sort
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Sort A-Z</Menu.Item>
              <Menu.Item>Sort Z-A</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          {/* Actions Menu */}
          <Menu shadow="md">
            <Menu.Target>
              <Button
                variant="outline"
                size="md"
                color="#206bc4"
                style={{ padding: "10px 15px" }}
              >
                <Hand className="w-5 h-5 me-1" /> Actions
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>
                <div className="flex gap-1 items-center">
                  <Eye className="w-4 h-4" /> Preview
                </div>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          {/* View toggle */}
          <div className="inline-flex">
            <button
              onClick={() => setActive("grid")}
              className={`px-4 py-2 flex items-center gap-1 border rounded-tl rounded-bl cursor-pointer
                ${
                  active === "grid"
                    ? "bg-blue-50 text-[#206bc4] border-[#206bc4]"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
            >
              <LayoutPanelLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActive("list")}
              className={`px-4 py-2 flex items-center gap-1 border rounded-tr rounded-br cursor-pointer
                ${
                  active === "list"
                    ? "bg-blue-50 text-[#206bc4] border-[#206bc4]"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
            >
              <Rows2 className="w-5 h-5" />
            </button>
          </div>

          <Button
            variant="outline"
            color="#206bc4"
            size="md"
            style={{ padding: "10px" }}
          >
            <ArrowRightFromLine />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div
        className="grid grid-cols-12 border-b border-gray-200"
        style={{ height: "calc(100vh - 265px)" }}
      >
        {/* Left grid */}
        <div className="col-span-9 overflow-y-auto">
          {active === "grid" ? (
            <div className="grid gap-4 p-3 grid-cols-[repeat(auto-fill,minmax(150px,150px))] justify-start">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col items-center max-w-[150px] cursor-pointer border relative
            ${
              activeId === item.id
                ? "border-[#206bc4] ring-2 ring-blue-300"
                : "border-transparent"
            }`}
                  onClick={() => {
                    setSelectedItem(item);
                    setActiveId(item.id);
                  }}
                >
                  <div className="bg-gray-50 rounded w-full aspect-square flex items-center justify-center hover:bg-gray-100">
                    {item.type === "folder" ? (
                      <Folder className="w-10 h-10" />
                    ) : (
                      <img
                        src={item.fullUrl}
                        alt={item.name}
                        className="max-w-full max-h-full"
                      />
                    )}
                  </div>
                  <span
                    className={`py-1 text-sm truncate w-full text-center ${
                      activeId === item.id
                        ? "bg-[#206bc4] text-white"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {item.name}
                  </span>
                  {activeId === item.id && (
                    <CircleCheckBig className="w-5 h-5 text-white bg-[#206bc4] rounded-full absolute top-1 right-1" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 cursor-pointer ${
                    activeId === item.id ? "bg-[#206bc4] " : ""
                  }`}
                  onClick={() => {
                    setSelectedItem(item);
                    setActiveId(item.id);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-50 border border-gray-300 rounded">
                      {item.type === "folder" ? (
                        <Folder className="w-6 h-6" />
                      ) : (
                        <img
                          src={item.fullUrl}
                          alt={item.name}
                          className="max-w-full max-h-full"
                        />
                      )}
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          activeId === item.id ? "text-white " : ""
                        }`}
                      >
                        {item.name}
                      </p>
                      {item.size && (
                        <p
                          className={`text-sm text-gray-500 ${
                            activeId === item.id
                              ? "text-white"
                              : "text-gray-500"
                          }`}
                        >
                          {item.size}
                        </p>
                      )}
                    </div>
                  </div>
                  <p
                    className={`text-sm ${
                      activeId === item.id ? "text-white " : "text-gray-500 "
                    }`}
                  >
                    {item.modifiedAt}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="col-span-3 border-s border-gray-300 overflow-y-auto bg-white shadow">
          {selectedItem ? (
            <div>
              {selectedItem.type === "folder" ? (
                <>
                  {/* Khung vuông */}
                  <div className=" w-full aspect-square mx-auto flex items-center justify-center border-b border-gray-300">
                    <Folder className="w-35 h-35" />
                  </div>

                  <div className="p-3 space-y-3">
                    <p>
                      <span className="font-medium block">Name</span>
                      <span className="text-gray-600">{selectedItem.name}</span>
                    </p>
                    <p>
                      <span className="font-medium block">Uploaded at</span>
                      <span className="text-gray-600">
                        {selectedItem.uploadedAt}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium block">Modified at</span>
                      <span className="text-gray-600">
                        {selectedItem.modifiedAt}
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Khung vuông */}
                  <div className=" w-full aspect-square mx-auto mb-3 flex items-center justify-center border-b border-gray-300">
                    <img
                      src={selectedItem.fullUrl}
                      alt={selectedItem.alt}
                      className="w-full h-auto object-contain px-3"
                    />
                  </div>

                  <div className="p-3 space-y-2">
                    <p>
                      <span className="font-medium block">Name:</span>
                      <span className="text-gray-600">{selectedItem.name}</span>
                    </p>
                    <p>
                      <span className="font-medium block">Full URL:</span>
                      <a
                        href={selectedItem.fullUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#206bc4] hover:underline break-all"
                      >
                        {selectedItem.fullUrl}
                      </a>
                    </p>
                    <p>
                      <span className="font-medium block">Size:</span>
                      <span className="text-gray-600">{selectedItem.size}</span>
                    </p>
                    <p>
                      <span className="font-medium block">Uploaded at:</span>
                      <span className="text-gray-600">
                        {selectedItem.uploadedAt}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium block">Modified at:</span>
                      <span className="text-gray-600">
                        {selectedItem.modifiedAt}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium block">Alt text:</span>
                      <span className="text-gray-600">{selectedItem.alt}</span>
                    </p>
                    <p>
                      <span className="font-medium block">Width:</span>
                      <span className="text-gray-600">
                        {selectedItem.width}px
                      </span>
                    </p>
                    <p>
                      <span className="font-medium block">Height:</span>
                      <span className="text-gray-600">
                        {selectedItem.height}px
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center border-b border-gray-300 w-full aspect-square">
              <Image className="w-35 h-35" />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-b border-gray-200 flex justify-end">
        <Button
          variant="filled"
          color="#206bc4"
          size="md"
          style={{ padding: "10px 15px" }}
          onClick={insertImageToCkeditor}
        >
          <ImageDown className="me-2" /> Insert
        </Button>
      </div>
    </>
  );
}
