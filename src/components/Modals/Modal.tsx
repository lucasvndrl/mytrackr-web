"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const Modal = ({ isOpen, onConfirm, onCancel, message }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center space-y-4">
        <p className="text-gray-800">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
