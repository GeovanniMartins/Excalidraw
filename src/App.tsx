import React, { useState, useEffect, useRef } from 'react';
import { Excalidraw, MainMenu, WelcomeScreen } from '@excalidraw/excalidraw';
import type { ExcalidrawImperativeAPI, LibraryItems } from '@excalidraw/excalidraw/types/types';

const LOCAL_STORAGE_KEY_ELEMENTS = 'excalidraw_elements';
const LOCAL_STORAGE_KEY_APP_STATE = 'excalidraw_app_state';
const LOCAL_STORAGE_KEY_LIBRARY = 'excalidraw_library';

const App: React.FC = () => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);
  const isInitialMount = useRef(true);

  // Load saved initial data from localStorage
  const getInitialData = () => {
    try {
      const savedElements = localStorage.getItem(LOCAL_STORAGE_KEY_ELEMENTS);
      const savedAppState = localStorage.getItem(LOCAL_STORAGE_KEY_APP_STATE);
      const savedLibrary = localStorage.getItem(LOCAL_STORAGE_KEY_LIBRARY);

      const elements = savedElements ? JSON.parse(savedElements) : [];
      const appState = savedAppState ? JSON.parse(savedAppState) : {};
      const libraryItems: LibraryItems = savedLibrary ? JSON.parse(savedLibrary) : [];

      return {
        elements,
        appState,
        libraryItems,
      };
    } catch (error) {
      console.error('Failed to load saved data from localStorage:', error);
      return { elements: [], appState: {}, libraryItems: [] };
    }
  };

  const [initialData] = useState(getInitialData);

  // Handle saving elements and appState changes
  const handleChange = (elements: readonly any[], appState: any) => {
    try {
      // Avoid saving selected element state to prevent sticky selections on reload
      const { selectedElementIds, selectedGroupIds, ...appStateToSave } = appState;
      localStorage.setItem(LOCAL_STORAGE_KEY_ELEMENTS, JSON.stringify(elements));
      localStorage.setItem(LOCAL_STORAGE_KEY_APP_STATE, JSON.stringify(appStateToSave));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  };

  // Handle saving library items (e.g. when importing .excalidrawlib)
  const handleLibraryChange = (libraryItems: LibraryItems) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_LIBRARY, JSON.stringify(libraryItems));
    } catch (error) {
      console.error('Failed to save library to localStorage:', error);
    }
  };

  // Ensure library items are updated in Excalidraw API when available
  useEffect(() => {
    if (excalidrawAPI && isInitialMount.current) {
      isInitialMount.current = false;
      if (initialData.libraryItems && initialData.libraryItems.length > 0) {
        excalidrawAPI.updateLibrary({
          libraryItems: initialData.libraryItems,
        });
      }
    }
  }, [excalidrawAPI, initialData.libraryItems]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        initialData={{
          elements: initialData.elements,
          appState: initialData.appState,
          libraryItems: initialData.libraryItems,
        }}
        onChange={handleChange}
        onLibraryChange={handleLibraryChange}
        UIOptions={{
          canvasActions: {
            changeViewBackgroundColor: true,
            clearCanvas: true,
            loadScene: true,
            saveToActiveFile: true,
            toggleTheme: true,
            saveAsImage: true,
          },
        }}
      >
        <MainMenu>
          <MainMenu.DefaultItems.LoadScene />
          <MainMenu.DefaultItems.SaveToActiveFile />
          <MainMenu.DefaultItems.Export />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.Help />
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.ToggleTheme />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
        <WelcomeScreen>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.ToolbarHint />
          <WelcomeScreen.Hints.HelpHint />
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Logo />
            <WelcomeScreen.Center.Heading>
              Quadro Branco Interativo Excalidraw
            </WelcomeScreen.Center.Heading>
            <WelcomeScreen.Center.Menu>
              <WelcomeScreen.Center.MenuItemLoadScene />
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center.Menu>
          </WelcomeScreen.Center>
        </WelcomeScreen>
      </Excalidraw>
    </div>
  );
};

export default App;
