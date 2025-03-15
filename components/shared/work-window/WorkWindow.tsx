'use client';

import { motion } from 'framer-motion';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

export const WorkWindow = () => {
  const [ isOpen, setIsOpen ] = useState<boolean>( false );
  const [ isMaximized, setIsMaximized ] = useState<boolean>( false );
  const [ isMinimized, setIsMinimized ] = useState<boolean>( false );
  const [ position, setPosition ] = useState<Position>( { x: 0, y: 0 } );
  const [ size, setSize ] = useState<Size>( { width: 600, height: 400 } );
  const [ prevSize, setPrevSize ] = useState<Size>( { width: 600, height: 400 } );
  const [ prevPosition, setPrevPosition ] = useState<Position>( { x: 0, y: 0 } );
  const [ isDragging, setIsDragging ] = useState<boolean>( false );
  const nodeRef = useRef( null );

  useEffect( () => {
    // Centrar la ventana en la pantalla al iniciar
    if ( typeof window !== 'undefined' ) {
      setPosition( {
        x: ( window.innerWidth - size.width ) / 2,
        y: ( window.innerHeight - size.height ) / 4,
      } );
    }
  }, [ size.width, size.height ] );

  const handleToggleWindow = (): void => {
    setIsOpen( !isOpen );
    if ( isMinimized ) {
      setIsMinimized( false );
    }
  };

  const handleClose = ( e: MouseEvent<HTMLButtonElement> ): void => {
    e.stopPropagation();
    setIsOpen( false );
  };

  const handleMinimize = ( e: MouseEvent<HTMLButtonElement> ): void => {
    e.stopPropagation();
    setIsMinimized( true );
  };

  const handleRestore = (): void => {
    setIsMinimized( false );
  };

  const handleMaximize = ( e: MouseEvent<HTMLButtonElement> ): void => {
    e.stopPropagation();
    if ( !isMaximized ) {
      setPrevSize( { ...size } );
      setPrevPosition( { ...position } );
      setSize( { width: window.innerWidth - 40, height: window.innerHeight - 40 } );
      setPosition( { x: 20, y: 20 } );
      setIsMaximized( true );
    } else {
      setSize( { ...prevSize } );
      setPosition( { ...prevPosition } );
      setIsMaximized( false );
    }
  };

  const handleTitleDoubleClick = ( e: MouseEvent<HTMLDivElement> ): void => {
    e.stopPropagation();
    if ( !isMaximized ) {
      setPrevSize( { ...size } );
      setPrevPosition( { ...position } );
      setSize( { width: window.innerWidth - 40, height: window.innerHeight - 40 } );
      setPosition( { x: 20, y: 20 } );
      setIsMaximized( true );
    } else {
      setSize( { ...prevSize } );
      setPosition( { ...prevPosition } );
      setIsMaximized( false );
    }
  };

  const handleDragStart = (): void => {
    setIsDragging( true );

    if ( isMaximized ) {
      setIsMaximized( false );
      setSize( { ...prevSize } );
      // La nueva posición se calculará en el primer evento de arrastre
    }
  };

  const handleDrag = ( _: DraggableEvent, data: DraggableData ): void => {
    setPosition( { x: data.x, y: data.y } );
  };

  const handleDragStop = (): void => {
    setIsDragging( false );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={ handleToggleWindow }
        className="relative z-10 px-5 py-2.5 mb-4 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-md transition-all duration-200"
      >
        { isOpen ? ( isMinimized ? 'Restaurar Ventana' : 'Cerrar Ventana' ) : 'Abrir Ventana' }
      </button>

      { isMinimized && isOpen && (
        <motion.div
          initial={ { y: 50, opacity: 0 } }
          animate={ { y: 0, opacity: 1 } }
          exit={ { y: 50, opacity: 0 } }
          transition={ { type: 'spring', stiffness: 300, damping: 20 } }
          className="fixed bottom-4 left-4 z-50"
        >
          <motion.button
            whileHover={ { scale: 1.05 } }
            whileTap={ { scale: 0.95 } }
            onClick={ handleRestore }
            className="p-2 bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl focus:outline-none transition-all duration-200"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </motion.button>
        </motion.div>
      ) }

      { isOpen && !isMinimized && (
        <Draggable
          nodeRef={ nodeRef }
          position={ position }
          onStart={ handleDragStart }
          onDrag={ handleDrag }
          onStop={ handleDragStop }
          handle=".window-handle"
        >
          <div
            ref={ nodeRef }
            style={ {
              width: `${ size.width }px`,
              height: `${ size.height }px`,
              position: 'absolute',
              zIndex: 40
            } }
            className="flex flex-col overflow-hidden bg-white rounded-lg shadow-2xl border border-gray-200"
          >
            {/* Barra de título estilo macOS */ }
            <div
              className="window-handle flex items-center px-4 py-2 bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-300 cursor-grab active:cursor-grabbing select-none"
              onDoubleClick={ handleTitleDoubleClick }
            >
              <div className="flex space-x-2 mr-4">
                {/* Botón de cerrar */ }
                <button
                  onClick={ handleClose }
                  className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 focus:outline-none transition-colors duration-200 flex items-center justify-center group"
                >
                  <svg
                    className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={ 2 }
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {/* Botón de minimizar */ }
                <button
                  onClick={ handleMinimize }
                  className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none transition-colors duration-200 flex items-center justify-center group"
                >
                  <svg
                    className="w-2 h-2 text-yellow-800 opacity-0 group-hover:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={ 2 }
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                {/* Botón de maximizar */ }
                <button
                  onClick={ handleMaximize }
                  className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 focus:outline-none transition-colors duration-200 flex items-center justify-center group"
                >
                  <svg
                    className="w-2 h-2 text-green-800 opacity-0 group-hover:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={ 2 }
                      d={ isMaximized
                        ? "M9 11V7a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2h-6a2 2 0 01-2-2v-4M3 15h6"
                        : "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" }
                    />
                  </svg>
                </button>
              </div>
              <div className="text-sm text-center text-gray-700 font-medium flex-grow">
                Mi Ventana
              </div>
            </div>

            {/* Contenido de la ventana */ }
            <div className="flex-grow p-6 overflow-auto bg-white">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Contenido de la Ventana
              </h2>
              <p className="text-gray-600 mb-3">
                Esta es una ventana estilo macOS con capacidad de arrastrar, minimizar,
                maximizar y cerrar. El estilo visual imita la elegancia y profesionalismo
                de las interfaces de Apple.
              </p>
              <p className="text-gray-600 mb-3">
                Puedes arrastrarla utilizando la barra superior y redimensionarla
                con el botón verde. Las animaciones de apertura y cierre están
                implementadas con Framer Motion para ofrecer una experiencia
                visual agradable.
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                <p className="text-sm text-gray-500">
                  Este componente utiliza Tailwind CSS para los estilos,
                  react-draggable para la funcionalidad de arrastre y
                  framer-motion para las animaciones fluidas.
                </p>
              </div>
            </div>
          </div>
        </Draggable>
      ) }
    </div>
  );
};