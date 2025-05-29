import React from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  inline?: boolean;
  language?: string;
}

const escapeHTML = (str: string): string => {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, inline = false, language = 'cpp' }) => {
  const langClass = inline ? "" : `language-${language}`;
  let textContent = Array.isArray(children) ? children.join('') : String(children ?? '');

  if (!inline) {
    // Apply syntax highlighting for block code
    // Comments
    textContent = textContent.replace(/(\/\*[\s\S]*?\*\/|\/\/[^\n]*)/g, (match: string) => { // Fixed newline, typed match
      return `<span class="text-green-400">${escapeHTML(match)}</span>`;
    });
    // Strings
    textContent = textContent.replace(/("(?:\.|[^"\\])*"|'(?:\.|[^'\\])*')/g, (match: string) => { // Typed match
      return `<span class="text-yellow-400">${escapeHTML(match)}</span>`;
    });
    // Preprocessor
    textContent = textContent.replace(/(^\s*#\s*(?:include|define|undef|if|ifdef|ifndef|else|elif|endif|error|pragma|warning|line)\s*(?:[<"][^>"]*[>"]|[^\s\/\n]+)?)/gm, (match: string) => { // Fixed newline, typed match
      return `<span class="text-purple-400">${escapeHTML(match)}</span>`;
    });
    // Keywords
    const keywords = [
      'alignas', 'alignof', 'and', 'and_eq', 'asm', 'atomic_cancel', 'atomic_commit', 'atomic_noexcept',
      'auto', 'bitand', 'bitor', 'bool', 'break', 'case', 'catch', 'char', 'char8_t', 'char16_t',
      'char32_t', 'class', 'compl', 'concept', 'const', 'consteval', 'constexpr', 'constinit',
      'const_cast', 'continue', 'co_await', 'co_return', 'co_yield', 'decltype', 'default', 'delete',
      'do', 'double', 'dynamic_cast', 'else', 'enum', 'explicit', 'export', 'extern', 'false', 'float',
      'for', 'friend', 'goto', 'if', 'inline', 'int', 'long', 'mutable', 'namespace', 'new', 'noexcept',
      'not', 'not_eq', 'nullptr', 'operator', 'or', 'or_eq', 'private', 'protected', 'public',
      'reflexpr', 'register', 'reinterpret_cast', 'requires', 'return', 'short', 'signed', 'sizeof',
      'static', 'static_assert', 'static_cast', 'struct', 'switch', 'synchronized', 'template',
      'this', 'thread_local', 'throw', 'true', 'try', 'typedef', 'typeid', 'typename', 'union',
      'unsigned', 'using', 'virtual', 'void', 'volatile', 'wchar_t', 'while', 'xor', 'xor_eq',
      'std', 'cout', 'cin', 'endl', 'vector', 'string', 'map', 'set', 'array', 'list', 'deque',
      'shared_ptr', 'unique_ptr', 'weak_ptr', 'move', 'forward', 'get', 'make_unique', 'make_shared',
      'UCLASS', 'UPROPERTY', 'UFUNCTION', 'GENERATED_BODY', 'GENERATED_UCLASS_BODY', 'UPARAM', 'UENUM', 'USTRUCT', 'UMETA',
      'TEXT', 'ensure', 'check', 'verify', 'TEXT_PASTE', 'DECLARE_DYNAMIC_MULTICAST_DELEGATE', 'DECLARE_DELEGATE', 'DECLARE_EVENT',
      'BlueprintCallable', 'BlueprintPure', 'BlueprintReadWrite', 'BlueprintImplementableEvent', 'BlueprintNativeEvent',
      'Category', 'EditAnywhere', 'VisibleAnywhere', 'meta'
    ];
    const keywordRegex = new RegExp(`(?<![\\w\\$])(${keywords.join('|')})(?![\\w\\$])`, 'g');
    textContent = textContent.replace(keywordRegex, (match: string) => { // Typed match
      return `<span class="text-pink-400">${escapeHTML(match)}</span>`;
    });
    // Unreal Types
    const unrealTypes = [
      'FString', 'FName', 'FText', 'FVector', 'FVector2D', 'FVector4', 'FRotator', 'FQuat', 'FTransform',
      'FColor', 'FLinearColor', 'AActor', 'UActorComponent', 'USceneComponent', 'UPrimitiveComponent',
      'UObject', 'UWorld', 'APlayerController', 'APawn', 'ACharacter', 'AGameModeBase', 'AGameStateBase',
      'APlayerState', 'AHUD', 'UGameInstance', 'ULocalPlayer', 'TArray', 'TMap', 'TSet', 'TSubclassOf',
      'TLazyObjectPtr', 'TSoftObjectPtr', 'TWeakObjectPtr', 'int32', 'uint32', 'int64', 'uint64', 'float', 'double', 'bool', 'uint8', 'int8'
    ];
    const unrealTypesRegex = new RegExp(`(?<![\\w\\$])(${unrealTypes.join('|')})(?![\\w\\$])`, 'g');
    textContent = textContent.replace(unrealTypesRegex, (match: string) => { // Typed match
      return `<span class="text-sky-400">${escapeHTML(match)}</span>`;
    });
    // Numbers
    textContent = textContent.replace(/\b(0[xX][0-9a-fA-F]+[ULul]*|0[bB][01]+[ULul]*|(?:[0-9]+\.[0-9]*|\.[0-9]+|[0-9]+)(?:[eE][-+]?[0-9]+)?[fFdDlLmMULul]*)\b/g, (match: string) => { // Fixed \b, typed match
      return `<span class="text-teal-400">${escapeHTML(match)}</span>`;
    });
  } else {
    // For inline code, just escape the original content
    textContent = escapeHTML(textContent);
  }

  if (inline) {
    // For inline, use a simple <code> tag
    return <code className='bg-comet-grey text-nebula-aqua px-1.5 py-0.5 rounded text-sm font-mono inline-code' dangerouslySetInnerHTML={{ __html: textContent }}></code>;
  } else {
    // For block, use <pre> and <code> for highlighted content
    return (
      <pre className={`bg-comet-grey/50 p-4 rounded-md overflow-x-auto text-sm my-3 shadow-inner border border-shadow-slate/50 ${langClass}`}>
        <code className={`text-starlight-blue font-mono ${langClass}`} dangerouslySetInnerHTML={{ __html: textContent }}></code>
      </pre>
    );
  }
};