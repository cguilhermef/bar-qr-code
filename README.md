## {Bar | QR} code - bqc

Extrai código de barras e qr-code a partir da câmera do dispositivo.

### Uso

- Inserir a lib _ZXing_ no fim da tag `<body>`

```html
<script src="https://unpkg.com/@zxing/library@0.18.5/umd/index.js"></script>
```

- Copiar o conteúdo do arquivo _scripts.js_ para o arquivo de script que executa na tela
  onde a leitura será realizada.
- Copiar o conteúdo do arquivo _styles.css_ ("Bloco necessário") para o arquivo de estilos do local onde será feita a leitura.
- adicionar o bloco `<div class="bqc-overlay" id="bqc-overlay">...</div>` em qualquer lugar dentro do body da tela de leitura.
- adicionar a classe `js-bqc-button-read` ao botão que iniciará a leitura.
- adicionar a classe `js-bqc-result-output` ao input no qual deve ser escrito o código lido.
