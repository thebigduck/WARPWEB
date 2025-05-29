import React from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  inline?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, inline = false }) => {
  const langClass = inline ? "" : "language-cpp"; 
  let textContent = typeof children === 'string' ? children : String(children);

  if (inline) {
    textContent = textContent.replace(/&/g, '&amp;')
                             .replace(/</g, '&lt;')
                             .replace(/>/g, '&gt;')
                             .replace(/"/g, '&quot;')
                             .replace(/'/g, '&#039;');
  } else {
    // Basic C++ syntax highlighting (order matters for regex execution)
    // Comments first to avoid highlighting keywords within comments
    textContent = textContent.replace(/(\/{2}[^
]*|\/\*[\s\S]*?\*\/)/g, '<span class="text-green-400">$1</span>');
    // Strings
    textContent = textContent.replace(/("[^"\]*(?:\.[^"\]*)*")/g, '<span class="text-yellow-400">$1</span>'); // Improved string regex
    // Preprocessor directives
    textContent = textContent.replace(/(^\s*#\s*(?:include|define|ifn?def|endif|pragma)\s*(?:[<"].*?[>"]|\w+)?)/gm, '<span class="text-purple-400">$1</span>'); // Simplified preprocessor
    // Keywords (common C++ and Unreal)
    // Ensure keywords are matched as whole words and not preceded by typical identifier characters
    textContent = textContent.replace(/(?<![\w\$])(UCLASS|UPROPERTY|UFUNCTION|GENERATED_BODY|class|struct|enum|void|int|float|double|char|bool|auto|const|static|virtual|override|nullptr|this|if|else|for|while|return|new|delete|try|catch|throw|public|private|protected|namespace|using|template|typename|friend|inline|explicit|mutable|operator|sizeof|typedef|union|volatile|wchar_t|asm|break|case|continue|default|do|extern|goto|long|register|short|signed|switch|unsigned|true|false)(?![\w\$])/g, '<span class="text-pink-400">$1</span>');
    // Common Unreal Types (example, extend as needed)
    textContent = textContent.replace(/(?<![\w\$])(FString|FName|FText|AActor|UActorComponent|UObject|TArray|TMap|TSet|TSubclassOf|FVector|FRotator|FTransform|APlayerController|ACharacter|UWorld|ULocalPlayer|AGameModeBase)(?![\w\$])/g, '<span class="text-sky-400">$1</span>');
  }
  
  return (
    <pre className={`${inline ? 'inline' : 'bg-comet-grey/50 p-4 rounded-md overflow-x-auto text-sm my-3 shadow-inner border border-shadow-slate/50'} ${langClass}`}>
      {inline ? (
          <code className='bg-comet-grey text-nebula-aqua px-1.5 py-0.5 rounded text-sm font-mono inline-code' dangerouslySetInnerHTML={{ __html: textContent }}></code>
      ) : (
          <code className='text-starlight-blue font-mono' dangerouslySetInnerHTML={{ __html: textContent }}></code>
      )}
    </pre>
  );
};