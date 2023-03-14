# Variação Ativo

## Online

Apenas publiquei no cloudfront sem a criação de um domínimo.

Acesso: https://d1qhvfw9hn8ehr.cloudfront.net

<br/>

## Telas

O projeto consiste em 3 telas principais.

- A tela responsável por listar alguns ativos que pré selecionei para poder consultar. Nesse caso poderiamos incluir uma api para retornar os ativos (eu não consegui extrair essa api do yahoo, e tbm não encontrei a dog das apis do yahoo, pelo que vi, eles não tem uma doc).
- A tela responsável por exibir os detalhes de determinado ativo, consultar ana api do yahoo perante os parametros selecionados e exibir um gráfico.

### Tela de listagem de ativos

![image](https://user-images.githubusercontent.com/10110065/225113384-bb13e086-7fd1-4b74-921b-742bcea547d0.png)

### Tela de detalhes do ativo

![image](https://user-images.githubusercontent.com/10110065/225113311-08e2ee96-3b1d-4963-8a42-5eae7a8e6fdf.png)

### Tela de componentes guide

![image](https://user-images.githubusercontent.com/10110065/225113523-ea6d291f-c9d2-4cb2-8fdb-2b96743c67e4.png)

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

## Padrão do projeto

### Services

Todos services utilizados nos projetos que construo, eu costumo utilizar um padrão com "resolve", utilizando sempre o conceito o componente fica totalmente desacoplado do service no sentido de que o componente precisa ser o menos "inteligente" possível e não efetuar chamadas sem necessidade ao service.
Então toda vez que uma rota é carregada, o service correspondente é resolvido, e o componente somente utiliza as variaveis que o próprio service já preencheu.

Para os services também tenho um CommonService, com alguns métodos onde qualquer outro service extend essa classe para ter varios recursos padrão.

### Componentes

Também contém um componente chamado BaseCompnent, com recursos onde outro componente pode também extende-lo e herder esses recursos.

### Code Style

Gosto de utilizar como base o airbnb style guide, junto ao eslint e prettier, também configurado no projeto.

## Store

Utilizei o ngrx-store para armazenamento de estado

Então toda request realizada, bem como também uma regra de negócio necessária, não ficou no component.
E sim eu fiz a inclusão no service que a store precisa disparar para preencher a entidade.

Como por exemplo o service com mais regra de negócio é esse: `src/app/store/services/variation.service.ts`

Onde consigo obter os dados da api do yahoo, abstrair o que preciso e montar as regras, como exibir o seguinte:

```
{
  id: "aqui é o timestamp",
  label: "aqui é o timestam formatado para dd/mm/yyyy",
  color: "aqui eu criei uma regra para identificar se o valor de fechamento é maior/menor que de abertura",
  open: "aqui é o valor de abertura",
  close: "aqui é o valor de fechamento",
  volume: "aqui é o volume",
  variation: "aqui é a variação entre a abertura e fechamento"
}
```

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

### Criando a lambda:

![image](https://user-images.githubusercontent.com/10110065/225114000-4146e6d5-5da4-4835-b3dc-1ed6c3f5aa6c.png)

### Criando a api gateway:

![image](https://user-images.githubusercontent.com/10110065/225113888-46685e41-3b00-4f46-bfdf-aec12e77adbe.png)

### S3 com os arquivos do build:

![image](https://user-images.githubusercontent.com/10110065/225114127-06f1703b-9ead-47ac-a616-a2298eb4ea17.png)

### CloudFron apontando para o s3

![image](https://user-images.githubusercontent.com/10110065/225114231-5eb81ec9-ffa2-4d2d-a57a-aa3536675400.png)
