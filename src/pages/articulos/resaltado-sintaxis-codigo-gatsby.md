---
templateKey: article
title: Resaltado de Sintaxis de código en Gatsby (Syntax Highlight)
date: '2020-05-25'
updated: '2020-05-25'
description: Como añadir estilo a los bloques de código en nuestras páginas con Gatsby.
tags:
  - React
  - Gatsby
  - Gatsby Plugin
category: Gatsby
image: /img/articulos/syntax-highlighting.jpg
published: true
---

Páginas como esta que están escritas con Gatsby y utilizar archivos `Markdown` para generar nuevos artículos. Existe por defecto soporte para bloques de código, como el utilizado en la oración anterior.

El problema es que no existe un resaltado de sintaxis o _syntax highlighting_. La forma más sencilla de resolver este problema en Gatsby es utilizando **[PrismJs](https://prismjs.com/)**.

Existen 2 tipos de código de bloque: _Inline code_ y _Code Block_

## Inline Code

Inline Code es simplemente código que puede estar en la mima línea entre otro texto.

Por ejemplo: `console.log('hola')` es un inline Block. Este se escribe utilizando el simbolo de la tílde inversa (**`** **`**) y ubicando dentro de este el código que necesitamos:

La línea anterior se la consigue de esta manera:

```
Por ejemplo: `console.log('hola')` es un inline Block.
```

## Code Block

Un Bloque de código no es más que código que puede ocupar varias líneas.

```javascript
// Este es un bloque de código
console.log('Hola de nuevo');
```

Para definir un bloque de código se utiliza la misma tilde inversa, pero esta vez necesitamos utilizar **3** tildes para abrir y otras 3 para cerrar el bloque.

## Instalación de Prismjs

Vamos a utilizar el plugin **[gatsby-remark-prismjs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/)**

Lo instalamos:

```
npm install --save gatsby-transformer-remark gatsby-remark-prismjs prismjs

```

## Uso

Necesitamos agregarlo a la configuración en el archivo **gatsby-config.js**.

```javascript
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-prismjs`,
        },
      ],
    },
  },
];
```

El ultimo paso es **incluirlo la hoja de estilo** en nuestro proyecto. En el archivo **gatsby-browser.js** agregamos el tema que queremos utilizar:

```javascript
import 'prismjs/themes/prism-okaidia.css';
```

El listado de temas se los puede encontrar en **[https://prismjs.com/](https:/prismjs.com/)**. Y podemos cambiar al que más nos guste.

Esta pagina utiliza el tema _okaidia_ con algunos ajustes personales.

## Personalización

Si al igual que yo no quieres que tu diseño sea exactamente igual al que se podría encontrar en otros sitios es muy sencillo realizar modificaciones y sobrescribir los estilos del tema. Simplemente agregamos los estilos en una hoja de estilos que estemos utilizando, en mi caso `src/css/style.css`.

Este sitio (al momento de escribir este tutorial utiliza los siguientes estilos).

### Modificando la apariencia de inline Block

```css
:not(pre) > code[class*='language-'] {
  background-color: #35bfee;
  color: white;
  padding: 1em;
}
```

### Modificando la apariencia de block code

```css
.gatsby-highlight {
  background-color: #1f1f1f;
  border-radius: 0.3em;
  margin: 0.5em 0;
  padding: 1em;
  overflow: auto;
}

.gatsby-highlight pre[class*='language-'] {
  background-color: transparent;
  margin: 0;
  padding: 0;
  overflow: initial;
  float: left;
  min-width: 100%;
}
```

### Modificando la línea resaltada

PrismJs permite resaltar líneas en el código de bloque. Esto se puede hacer agregando el comentario: `// highlight-next-line` antes de la línea que deseamos resaltar:

Su estilo se modifica con:

```css
.gatsby-highlight-code-line {
  <!-- highlight-next-line -->
  background-color: #2a4365;
  display: block;
  margin-right: -1em;
  margin-left: -1em;
  padding-right: 1em;
  padding-left: 0.75em;
  border-left: 0.25em solid #39DBF9;
}
```
