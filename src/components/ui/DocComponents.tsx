import React from 'react';
import {
  Typography,
  ButtonBase,
  IconButton, // Added IconButton for DocMainTitle and DocSubTitle chevrons
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircleIcon from '@mui/icons-material/Circle'; 
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const CodeBlock: React.FC<{ children: React.ReactNode, inline?: boolean, language?: string }> = ({ children, inline = false, language = '' }) => {
  const langClass = inline ? "" : language ? `language-${language}` : ""; 
  let textContent = typeof children === 'string' ? children : String(children);

  if (inline) {
    textContent = textContent.replace(/&/g, '&amp;')
                             .replace(/</g, '&lt;')
                             .replace(/>/g, '&gt;')
                             .replace(/"/g, '&quot;')
                             .replace(/'/g, '&#039;');
  } else {
    textContent = textContent.replace(/ (class|struct|enum|void|int|float|double|char|bool|auto|const|static|virtual|override|nullptr|this|if|else|for|while|return|new|delete|try|catch|throw|public|private|protected|namespace|using|template|typename|friend|inline|explicit|mutable|operator|sizeof|typedef|union|volatile|wchar_t|asm|break|case|continue|default|do|extern|goto|long|register|short|signed|switch|unsigned|true|false) /g, '<span class="text-pink-400">$1</span>');
    textContent = textContent.replace(/(\/\/.*)/g, '<span class="text-green-400">$1</span>');
    textContent = textContent.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-green-400">$1</span>');
    textContent = textContent.replace(/(".*?")/g, '<span class="text-yellow-400">$1</span>');
    textContent = textContent.replace(/(#include|#define|#ifdef|#ifndef|#endif|#pragma)\s*([<\w\.\/"]+)?/g, '<span class="text-purple-400">$1 $2</span>');
    textContent = textContent.replace(/ (UCLASS|UPROPERTY|UFUNCTION|GENERATED_BODY|FString|FName|FText|AActor|UActorComponent|UObject|TArray|TMap|TSet|TSubclassOf) /g, '<span class="text-sky-400">$1</span>');
  }
  
  return (
    <pre className={`${inline ? '' : 'bg-[#2D6A4F]/50 p-4 rounded-md overflow-x-auto text-sm my-3 shadow-inner border border-[#1B4332]/50'} ${langClass}`}> 
      {inline ? (
          <code className='bg-[#2D6A4F] text-[#95D5B2] px-1.5 py-0.5 rounded text-sm font-mono' dangerouslySetInnerHTML={{ __html: textContent }}></code> 
      ) : (
          <code className='text-[#D8F3DC] font-mono' dangerouslySetInnerHTML={{ __html: textContent }}></code> 
      )}
    </pre>
  );
};

export const ListItem: React.FC<{ children: React.ReactNode, ordered?: boolean, className?: string }> = ({ children, ordered = false, className = "" }) => (
  <MuiListItem disablePadding className={`mb-2 flex items-start ${className} ${ordered ? 'list-item' : ''}`}>
    {!ordered && (
      <ListItemIcon sx={{minWidth: 'auto', marginRight: '12px', color: '#74C69D', paddingTop: '4px'}}>
        <ChevronRightIcon sx={{fontSize: '1.2rem'}}/>
      </ListItemIcon>
    )}
    {ordered && <span className="mr-2 text-[#74C69D] font-medium self-start pt-0.5"></span>} 
    <ListItemText primaryTypographyProps={{ className: 'text-[#D8F3DC]'}} primary={children} />
  </MuiListItem>
);

export const SubListItem: React.FC<{ children: React.ReactNode, ordered?: boolean, className?: string }> = ({ children, ordered = false, className = "" }) => ( 
  <MuiListItem disablePadding className={`ml-5 mb-1 flex items-start ${className} ${ordered ? 'list-item' : ''}`}>
      {!ordered && (
      <ListItemIcon sx={{minWidth: 'auto', marginRight: '8px', color: '#95D5B2', paddingTop: '6px'}}>
        <CircleIcon sx={{ fontSize: '0.4rem' }} />
      </ListItemIcon>
    )}
    {ordered && <span className="mr-2 text-[#95D5B2] font-medium self-start pt-0.5"></span>} 
    <ListItemText primaryTypographyProps={{className: 'text-[#D8F3DC]/90 text-sm'}} primary={children} />
  </MuiListItem>
);

interface BaseDocTitleProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

interface InteractiveDocTitleProps extends BaseDocTitleProps {
    onClick: () => void; 
    isExpanded: boolean; 
    onToggle?: () => void;
}

interface ClickableDocTitleProps extends BaseDocTitleProps {
    onClick?: () => void;
}

export const DocMainTitle: React.FC<InteractiveDocTitleProps> = ({id, children, onClick, isExpanded, onToggle, className=""}) => ( 
    <ButtonBase 
        onClick={onClick} 
        className={`w-full flex justify-between items-center text-left mb-6 scroll-mt-24 py-2 hover:text-[#95D5B2] transition-colors ${className}`}
        focusRipple
        sx={{ justifyContent: 'space-between'}}
        aria-expanded={isExpanded}
        role="button" // Added for accessibility
    >
        <Typography variant="h4" component="h1" id={id} className="flex-grow font-['Chypre',_Inter,_sans-serif] font-bold text-[#74C69D]">
            {children}
        </Typography>
        <IconButton 
            onClick={(e) => { e.stopPropagation(); if(onToggle) onToggle(); else onClick(); }} 
            size="small" 
            aria-label={isExpanded ? "collapse section" : "expand section"}
            sx={{color: '#74C69D', ml:1}}
        >
            {isExpanded ? <ArrowDropUpIcon className="w-6 h-6"/> : <ArrowDropDownIcon className="w-6 h-6"/>}
        </IconButton>
    </ButtonBase>
  );

export const DocSubTitle: React.FC<InteractiveDocTitleProps> = ({id, children, onClick, isExpanded, onToggle, className=""}) => ( 
    <ButtonBase 
        onClick={onClick} 
        className={`w-full flex justify-between items-center text-left mb-4 border-l-4 border-[#74C69D]/50 pl-4 scroll-mt-24 py-1 hover:text-[#95D5B2] transition-colors ${className}`}
        focusRipple
        sx={{ justifyContent: 'space-between'}}
        aria-expanded={isExpanded}
        role="button" // Added for accessibility
    >
        <Typography variant="h5" component="h2" id={id} className="flex-grow font-['Chypre',_Inter,_sans-serif] font-bold text-[#74C69D]">
            {children}
        </Typography>
        <IconButton 
            onClick={(e) => { e.stopPropagation(); if(onToggle) onToggle(); else onClick(); }}
            size="small" 
            aria-label={isExpanded ? "collapse section" : "expand section"}
            sx={{color: '#74C69D', ml:1}}
        >
            {isExpanded ? <ArrowDropUpIcon className="w-5 h-5"/> : <ArrowDropDownIcon className="w-5 h-5"/>}
        </IconButton>
    </ButtonBase>
  );

export const DocSubSubTitle: React.FC<ClickableDocTitleProps> = ({id, children, className="", onClick}) => ( 
    <Typography 
        variant="h6" 
        component="h3" 
        id={id} 
        onClick={onClick}
        className={`text-lg sm:text-xl font-medium mb-4 mt-8 text-[#95D5B2] scroll-mt-24 ${className || ''} font-['Chypre',_Inter,_sans-serif] ${onClick ? 'cursor-pointer hover:text-[#74C69D]' : ''}`.trim()}
    >
        {children}
    </Typography>
  );
 
export const DocSubSubSubTitle: React.FC<ClickableDocTitleProps> = ({id, children, className="", onClick}) => ( 
    <Typography 
        variant="subtitle1" 
        component="h4" 
        id={id} 
        onClick={onClick}
        className={`text-base sm:text-lg font-medium mb-3 mt-6 text-[#D8F3DC] scroll-mt-24 ${className || ''} font-['Chypre',_Inter,_sans-serif] ${onClick ? 'cursor-pointer hover:text-[#95D5B2]' : ''}`.trim()}
    >
        {children}
    </Typography>
  );
