# easyOrder: Aplicação Tech Challenge POS TECH SOAT8 FIAP - Grupo 03 (Fase 4)

## Microserviço de Produtos

Este repositório contém a implementação do microserviço de produtos da aplicação easyOrder 4.0, que foi desenvolvida como parte do Tech Challenge da quarta etapa da Pós Tech de Arquitetura de Software (Turma SOAT8) da FIAP. 

&nbsp;
## Repositório dedicado para Microserviço de Produtos 
- Inclui o código da aplicação em Typescript, conectando-se ao cluster Kubernetes previamente configurado na AWS.
- Utiliza Github Actions para CI/CD: CI para validação do código e execução de testes, e CD para deploy da imagem da aplicação no Docker Hub.
- Fornece dados (configurações em bucket S3) para a correta configuração do repositório serverless.
- Documentação detalhada sobre a aplicação e a infraestrutura.
- Instruções para execução da aplicação.

## Estrutura do Diretório

```plaintext
manifesto_kubernetes        
└── *.yaml                  - arquivos de configuração dos artefatos kubernetes
docs                        - documentações e guias de implementação
src                         - diretório principal com arquivos .tf
└── *.ts                    - código-fonte da aplicação, incluindo testes
```

## Configuração do CI/CD

### Quality Gate

ADICIONAR INFORMAÇÕES SOBRE QUALITY GATE

O repositório possui um workflow de CI/CD configurado com o Github Actions, que realiza a validação e deploy da application na AWS.

O workflow de CI é acionado a cada push no repositório, e executa as seguintes etapas:

![Descrição da Imagem](docs/assets/ci-image.png)

O workflow de CD é dividido em duas partes a primeira acontece ao finalizar o push:

![Descrição da Imagem](docs/assets/cd-image1.png)

Em seguida acontece a parte manual que executa as seguintes etapas:

![Descrição da Imagem](docs/assets/cd-image2.png)

## Subindo a aplicação com o Github Actions (Produção)

Para subir a infraestrutura com o Github Actions, siga os passos abaixo:

1. Acesse o repositório do Github e clique na aba `Actions`, ou acesse diretamente o link abaixo:
 https://github.com/pos-tech-soat08-03/easyOrder-challenge3-application/actions

2. Clique no workflow `Application CD - Deploy no EKS` e em seguida clique no botão `Run workflow`

O workflow irá solicitar as chaves de acesso da AWS, que serão obtidas do ambiente do AWS Labs:

```plaintext
environment: <Ambiente de deployment (ex.: lab, staging, prod)>
aws_access_key_id: <AWS Access Key ID>
aws_secret_access_key: <AWS Secret Access Key>
aws_session_token: <AWS Session Token>
aws_account_id: <AWS Account ID>
aws_backend_bucket: <AWS S3 Bucket para armazenamento do estado do Terraform>
aws_region: <AWS Region>
```

Ao final da execução do workflow, a aplicação estará disponível na AWS, e o endpoint será disponibilizado para utilização no API Gateway no repositório serverless

## Subindo a aplicação manualmente (Desenvolvimento)

... TODO

## Executando os testes

... TODO
