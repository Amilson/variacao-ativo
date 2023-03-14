# Variação Ativo

## Online

Apenas publiquei no cloudfront sem a criação de um domínimo.

Acesso: https://d1qhvfw9hn8ehr.cloudfront.net

<br/>

## Guide Style

Para desenvolvimento do style, criei uma library contendo alguns componentes, e inicialmente idealizei o layout dos botões da plataforma inteira.

Esta library carrega um json com cores no formato hexadecimal localizado em `assets/guide-style-settings.json`.

Este JSON também contém a configuração de font-family. A library inteira se modela á configuração desse JSON.

O que possibilita a criação de white-labels diferenciados, caso a guide tenha clientes que queiram contratar a plataforma e queiram utilizar seu proprio styleguide (cores, imagens, etc)

<br/>

O projeto contém:

- Buttons

Com opção de tipo primary, border, e cores success, white, question.

```
<guide-button type="primary">
  Primary
</guide-button>
```

---

### Como utilizar a library:

Após customizar ou criar algum componente novo, rodar o comando:

```
ng build guide-style
```

Será disponibilizado o build na pasta /dist.
Nesse caso poderia ser publicado tambem no npm, onde tambem já fiz em diversos projetos.

---

## Store

Utilizei o ngrx-store para armazenamento de estado

## Deploy

Estou utilizando ambiente da aws

Então criei o seguinte:

- Criei 1 bucket no s3 chamado: variacao-ativo
- Criei 1 cloudfront para consumir o conteudo do bucket s3 variacao-ativo

O deploy consiste em:

- rodar o comando `ng build`
- e na sequência os seguintes comandos:

```
aws s3 rm s3://variacao-ativo --recursive
cd dist/variacao-ativo
aws s3 cp . s3://variacao-ativo --recursive
aws cloudfront create-invalidation --distribution-id E28ZXE9B75RCZF --paths "/*"
```

## Plus + Api

Para conseguir utilizar a api do yahoo, existe um block por cors ao rodar num domínio diferente do yahoo.

Então desenvolvi uma api servless bem simples, apenas fazendo chamadas na api do yahoo repassando os parametros que eu preciso.

O código da api esta na pasta `api/lambda`

- Então criei uma lambda na aws
- Publiquei uma api gateway para consumir essa lambda
- Api: `https://qkcb0vctrf.execute-api.us-east-1.amazonaws.com/variacao-ativo?symbol=PETR4.SA&period1=1671036335&period2=1678812335&useYfid=true&interval=1d&includePrePost=true&events=div%7Csplit%7Cearn`
