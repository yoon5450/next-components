"use client";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

interface Position {
  x: number;
  y: number;
}

interface DragState {
  position: Position | null;
  text: string;
  isLoading: boolean;
  error: string | null;
}

export default function DragObserver() {
  const [dragState, setDragState] = useState<DragState>({
    position: null,
    text: "",
    isLoading: false,
    error: null,
  });

  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    
    // 선택이 없거나 비어있으면 상태 초기화
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      setDragState(prev => ({
        ...prev,
        position: null,
        text: "",
        error: null,
      }));
      return;
    }

    // 선택이 특정 컨테이너 안에서만 유효하게 (예: #post)
    const root = document.getElementById("post");
    if (!root || !selection.anchorNode || !root.contains(selection.anchorNode)) {
      return;
    }

    const selectedText = selection.toString().trim();
    if (selectedText.length < 3) return; // 최소 3글자 이상

    const rect = selection.getRangeAt(0).getBoundingClientRect();
    const position = {
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.top + window.scrollY,
    };

    setDragState(prev => ({
      ...prev,
      position,
      text: selectedText,
      error: null,
    }));
  }, []);

  const handleAskAI = useCallback(async () => {
    if (!dragState.text) return;

    setDragState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ snippet: dragState.text }),
      });

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      const result = await response.json();
      console.log("AI 응답:", result);
      
      // 성공 시 선택 해제
      window.getSelection()?.removeAllRanges();
      setDragState(prev => ({
        ...prev,
        position: null,
        text: "",
        isLoading: false,
      }));
    } catch (error) {
      console.error("AI 요청 오류:", error);
      setDragState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
      }));
    }
  }, [dragState.text]);

  const handleClose = useCallback(() => {
    window.getSelection()?.removeAllRanges();
    setDragState(prev => ({
      ...prev,
      position: null,
      text: "",
      error: null,
    }));
  }, []);

  useEffect(() => {
    // 이벤트 리스너 등록
    document.addEventListener("selectionchange", handleSelection);
    window.addEventListener("scroll", handleSelection, { passive: true });
    window.addEventListener("resize", handleSelection);

    return () => {
      document.removeEventListener("selectionchange", handleSelection);
      window.removeEventListener("scroll", handleSelection);
      window.removeEventListener("resize", handleSelection);
    };
  }, [handleSelection]);

  // 포털이 렌더링될 DOM이 준비되지 않았으면 null 반환
  if (typeof window === "undefined" || !dragState.position || !dragState.text) {
    return null;
  }

  return createPortal(
    <div
      style={{
        position: "absolute",
        left: dragState.position.x,
        top: dragState.position.y - 44,
        transform: "translateX(-50%)",
        zIndex: 9999,
      }}
      className="rounded-md border bg-white shadow-lg px-3 py-2 min-w-[200px]"
      onMouseDown={(e) => e.preventDefault()}
      role="tooltip"
      aria-label="선택된 텍스트에 대한 AI 질문 도구"
    >
      <div className="flex items-center gap-2">
        <button
          onClick={handleAskAI}
          disabled={dragState.isLoading}
          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white text-sm px-3 py-1 rounded transition-colors"
          aria-label={`"${dragState.text}"에 대해 AI에게 질문하기`}
        >
          {dragState.isLoading ? "처리중..." : "AI에게 물어보기"}
        </button>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 text-sm px-1"
          aria-label="닫기"
        >
          ✕
        </button>
      </div>
      
      {dragState.error && (
        <div className="mt-2 text-xs text-red-500" role="alert">
          {dragState.error}
        </div>
      )}
      
      <div className="mt-1 text-xs text-gray-600 truncate" title={dragState.text}>
        &ldquo;{dragState.text}&rdquo;
      </div>
    </div>,
    document.body
  );
}
