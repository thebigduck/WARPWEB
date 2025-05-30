import React from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  inline?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, inline = false }) => {
  const langClass = inline ? "" : "language-cpp";
  let textContent = typeof children === 'string' ? children : String(children);

  if (inline) {
    textContent = textContent.replace(/&/g, '&amp;')
                             .replace(/</g, '&lt;')
                             .replace(/>/g, '&gt;')
                             .replace(/"/g, '&quot;')
                             .replace(/'/g, '&#039;');
  }

  if (!inline) {
    // Keywords
    textContent = textContent.replace(/(class|struct|enum|void|int|float|double|char|bool|auto|const|static|virtual|override|nullptr|this|if|else|for|while|return|new|delete|try|catch|throw|public|private|protected|namespace|using|template|typename|friend|inline|explicit|mutable|operator|sizeof|typedef|union|volatile|wchar_t|asm|break|case|continue|default|do|extern|goto|long|register|short|signed|switch|unsigned|true|false)/g, '<span class="text-pink-400">$1</span>');
    // Comments
    textContent = textContent.replace(/(\/\/.*)/g, '<span class="text-green-400">$1</span>');
    textContent = textContent.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-green-400">$1</span>');
    // Strings
    textContent = textContent.replace(/(".*?")/g, '<span class="text-yellow-400">$1</span>');
    // Preprocessor
    textContent = textContent.replace(/(#include|#define|#ifdef|#ifndef|#endif|#pragma)\s*([<\w\.\/"]+)?/g, '<span class="text-purple-400">$1 $2</span>');
    // Types (common Unreal types)
    textContent = textContent.replace(/(UCLASS|UPROPERTY|UFUNCTION|GENERATED_BODY|FString|FName|FText|AActor|UActorComponent|UObject|TArray|TMap|TSet|TSubclassOf|UMyGame...)/g, '<span class="text-sky-400">$1</span>');
  }

  return (
    <pre className={`${inline ? '' : 'bg-[#2D6A4F]/50 p-4 rounded-md overflow-x-auto text-sm my-3 shadow-inner border border-[#1B4332]/50'} ${langClass}`}> {/* comet-grey, shadow-slate */}
      {inline ? (
        <code className='bg-[#2D6A4F] text-[#95D5B2] px-1.5 py-0.5 rounded text-sm font-mono' dangerouslySetInnerHTML={{ __html: textContent }}></code> /* comet-grey, nebula-aqua */
      ) : (
        <code className='text-[#D8F3DC] font-mono' dangerouslySetInnerHTML={{ __html: textContent }}></code> /* starlight-blue */
      )}
    </pre>
  );
};

export default CodeBlock;
