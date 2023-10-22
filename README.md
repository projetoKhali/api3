# Ferramenta para controle de Horas Extras e Sobreavisos

<img align="right" width="256"  src="docs\Banners\Api.png"/>

Sistema que faça o controle da jornada de trabalho do colaborador, identifique e classifique horas extras e sobreavisos.

Acesso de administrador (master para os departamentos pessoal e financeiro), gestor (aprovação e lançamento) e colaborador (apontar horas extras).

<br>

<img src="docs\Banners\equipe.png"/>

<div align="center">
    <a href="https://github.com/incivius"target="_blank"><img src="https://img.shields.io/badge/-Marcos-%23000000?style=for-the-badge&logo=GitHUb&logoColor=white"></a>
    <a href="https://github.com/jhonatanLop" target="_blank"><img src="https://img.shields.io/badge/-Jhonatan-%23000000?style=for-the-badge&logo=GitHUb&logoColor=white"></a>
    <a href="https://github.com/paulo-granthon" target="_blank"><img src="https://img.shields.io/badge/-Paulo-%23000000?style=for-the-badge&logo=GitHUb&logoColor=white"></a>
    <a href="https://github.com/taniacruzz" target="_blank"><img src="https://img.shields.io/badge/-Tânia-%23000000?style=for-the-badge&logo=GitHUb&logoColor=white"</a>
</div>

<br><br><hr>

<img src="docs\Banners\Projeto.png"/>


### Detalhes e conhecimentos exigidos no projeto:

* Implementar Aplicação usando Linguagem de Programação (LP) Java Web para BackEnd;
* Implementar Aplicação usando conceitos de Orientação a Objetos (OO);
* Utilizar IDE´s na implementação de Aplicação em Java;
* Aplicar Técnicas de Depuração e Análise de Logs através da IDE com suporte para a LP Java;
* Implementar web services REST;
* Implementar clientes para consumir web services;
* Implementar projeto de Banco de Dados Relacional em termos de seus Principais Objetos (Schema, Tabelas, Views, Índices);
* Implementar consultas em um Banco de Dados Relacional, utilizando junções, subconsultas e agrupamentos;
* Implementar manutenção de dados utilizando DML.


### Artefatos:

<details>

<summary> Requisitos do projeto </summary>
<h2 align="center">Requisitos Funcionais</h2>

* Usuários devem ter perfis diferentes: administrador (acesso as informações de
parametrização, extração de relatórios e aprovação), gestor (aprovação e lançamento) e
colaborador (apontar horas);
* Apontamento de horas extras e classificação das horas;
* Apontamento de horas de sobreaviso;
* No lançamento da hora extra especificar cliente, CR (centro de resultado), projeto,
solicitante e justificativa;
* Cadastro de clientes e CRs;
* Workflow para aprovação de horas extras executadas;
* Parametrização de sistema (período de fechamento das horas, percentual de classificação
das horas extras (75% e 100%, conforme material de apoio) e adicional noturno
juntamente com as verbas salariais, definição dos horários de início e fim de horas
noturnas);
* Extração de relatório csv de todos os colaboradores com as horas trabalhadas (matrícula,
nome, verba, quantidade de horas, cliente, CR, projeto, justificativa);
* Aplicar regras de horas extras e sobreavisos na extração (classificação de HEs e cálculo do
sobreaviso considerando as HEs conflitantes);
* Notificação de lançamentos realizados para Gestor e RH;
* Dashboard com acompanhamento em tempo real das horas extras executadas com filtro
cliente, CR e colaborador.

<br>
<h2 align="center">Requisitos Não Funcionais</h2>

* Usabilidade (na facilidade de uso e na facilidade de aprendizado)
* Manutenibilidade (código passível de evolução e reparos)
    * Exemplo, na mudança de cores as telas sejam adaptativas a este requisito
* Desempenho
* Reusabilidade
* Segurança
* logins [oAuth, keyclock, por exemplo]
    * Autorização do acesso a informação (perfis de login)
    * Tráfego de dados através de endpoints com token que expiram
    * Se exportação de arquivo CSV, validação com processos de CheckSum

<br>
</details>

<details>
<summary> Product Backlog </summary>
<h2 align="center"> Sprint 1 </h2>

|  Story  | Críterios de aceite |
|:---------|:----------------------|
| Como colaborador preciso ser capaz de apontar as minhas horas extras e sobreavisos no sistema para que elas fiquem registradas. | Ser capaz de inserir apontamentos de sobreaviso; Ser capaz de inserir apontamentos de horas extras |
| Como colaborador preciso ter acesso ao estado dos meus apontamentos de hora extra e sobreaviso para me manter atualizado.  | Visualizar status dos apontamentos; Visualizar histórico de apontamentos. |
| Como gestor preciso ser capaz de consultar o histórico de apontamentos da(s) minha(s) squad(s) para facilitar o controle de horas extras e sobreavisos feitos pela minha squad. | Consulta de apontamentos por squad; Consulta de apontamentos por colaborador; Consulta de apontamentos por data |
| Como administrador preciso ter acesso aos apontamentos de hora extra e sobreaviso de cada squad dos meus gestores para melhor acompanhamento do período trabalhado dos meus colaboradores. |Visualizar todos os apontamentos lançados de todos os colaboradores. |
| Como administrador preciso ser capaz de cadastrar colaboradores, gestores e administradores para que eu possa designá-los as permissões corretas no sistema. | Inserir novo usuário do tipo Colaborador; Inserir novo usuário do tipo Gestor; Inserir novo usuário do tipo Administrador. |
| Como administrador preciso ser capaz de cadastrar squads para que os apontamentos sejam corretamente associados aos Centros de Resultado. | Inserir uma nova Squad. |

<br>
<h2 align="center"> Sprint 2 </h2>

|  Story  | Críterios de aceite |
|:---------|:----------------------|
| Como gestor preciso ser capaz de aprovar ou rejeitar os apontamentos de hora extra e sobreaviso dos colaboradores da(s) minha(s) squad(s) para barrar apontamentos inválidos.  | Ser capaz de Aprovar ou Reprovar um apontamento. |
| Como gestor preciso dar um feedback para apontamentos recusado por mim para que o solicitante tenha uma justificativa de o porquê da recusa.  | Ser capaz de inserir uma justificativa no caso de apontamentos reprovados |
| Como administrador preciso ser capaz de cadastrar clientes e seus respectivos projetos para que sejam referenciados durante o apontamento de horas extras e sobreavisos.  | Inserir novo cliente que possa ser associado em novos apontamentos; Inserir novo projeto que possa ser associado em novos apontamentos |
| Eu como administrador preciso poder desativar um colaborador no caso de uma desistência.  | Não ter mais visualização dos apontamentos dos usuários do tipo; Usuários desativados deixam de realizam apontamentos |
| Como administrador preciso ser capaz de configurar os parâmetros da verba dos apontamentos para ter melhor controle sobre as horas trabalhadas dos colaboradores.  | Ser capaz de alterar a duração da verba; Ser capaz de alterar o código da verba; Ser capaz de alterar a porcentagem do valor da hora. |

<br>
</details>

<details>
<summary> Backlog das Entregas </summary>

<h2>Sprint 1</h2>

|  Entregas  | Story |
|:---------|:----------------------|
| Fluxograma. | Planejamento - Não há story relacionada |
| Wireframe. | Planejamento - Não há story relacionada |
| ERD. | Planejamento - Não há story relacionada |
| Banco de Dados estruturado. | Planejamento - Não há story relacionada |
| Criação do sistema de apontamento de horas extras e sobreavisos. | Como colaborador preciso ser capaz de apontar as minhas horas extras e sobreavisos no sistema para que elas fiquem registradas. |
| Listagem de apontamentos de horas extras e sobreavisos. | Como colaborador preciso ter acesso ao estado dos meus apontamentos de hora extra e sobreaviso para me manter atualizado; Como gestor preciso ser capaz de consultar o histórico de apontamentos da(s) minha(s) squad(s) para facilitar o controle de horas extras e sobreavisos feitos pela minha squad; Como administrador preciso ter acesso aos apontamentos de hora extra e sobreaviso de cada squad dos meus gestores para melhor acompanhamento do período trabalhado dos meus colaboradores. |
| Sistema de cadastro de colaboradores, gestores e administradores. | Como administrador preciso ser capaz de cadastrar colaboradores, gestores e administradores para que eu possa designá-los as permissões corretas no sistema. |

<h2>Sprint 2</h2>

|  Entregas  | Story |
|:---------|:----------------------|
| Validação de apontamentos pelo gestor. | Como gestor preciso ser capaz de aprovar ou rejeitar os apontamentos de hora extra e sobreaviso dos colaboradores da(s) minha(s) squad(s) para barrar apontamentos inválidos. |
| Funcionalidade de feedback do gestor ao rejeitar um apontamento. | Como gestor preciso dar um feedback para apontamentos recusado por mim para que o solicitante tenha uma justificativa de o porquê da recusa. |
| Sistema de cadastro de squads. | Como administrador preciso ser capaz de cadastrar squads para que os apontamentos sejam corretamente associados aos Centros de Resultado. |
| Sistema de cadastro de clientes e projetos. | Como administrador preciso ser capaz de cadastrar clientes e seus respectivos projetos para que sejam referenciados durante o apontamento de horas extras e sobreavisos. |
| Desativação de usuário. | Eu como administrador preciso poder desativar um colaborador no caso de uma desistência. |
| Visualização de usuários desativados. | Eu como administrador preciso ter acesso a um histórico de colaboradores que foram desativados. |
| Funcionalidade de adição e parametrização de verbas do sistema. | Como administrador preciso ser capaz de configurar os parâmetros da verba dos apontamentos para ter melhor controle sobre as horas trabalhadas dos colaboradores |

</details>

<details>
<summary> Burndown </summary>
<br>
</details>

### Tríade da API
Linguagem de programação II, Progamação em Banco de dados e Laboratório de desenvolvimento de Banco de Dados III.

### Prazos

* [x] 04/09 a 24/09 - Sprint 1
* [x] 25/09 a 15/10 - Sprint 2
* [ ] 16/10 a 05/11 - Sprint 3
* [ ] 06/11 a 26/11 - Sprint 4

<br>
<br>

<hr>
<img src="docs\Banners\ProdutoK.png"/>

### Arquitetura e Tecnologias

Este repositório contém tanto o [Back-End](./api/) quanto o [Front-End](./web/) do desafio proposto pela FATEC em parceria com a empresa parceira.

#### Back-End `./api/`
>* [Java]().
>* [Spring](https://spring.io/).
>* [Docker](https://www.docker.com/) com [Docker Compose](https://docs.docker.com/compose/).
>* [PostgreSQL](https://www.postgresql.org/) banco de dados escolhido.
<br>

#### Front-End `./web/`
> * [React](https://react.dev/).
> * [Typescript](https://www.typescriptlang.org).
<br>

<hr>
<h2 align="center"> Estrutura e documentação </h2>
<br>

> [Wireframe completo no Figma](https://www.figma.com/file/0CRUGDxQoOc3QRMK16TyHa/Untitled?type=design&mode=design&t=ukkR699csvDlWLYY-1)

> [ERD](https://github.com/projetoKhali/api3/blob/be27d7c6c37234c0423714cce698620c3f090968/docs/Banners/ERD.PNG)

> [Diagrama de Entidade-Relacionamento](https://github.com/projetoKhali/api3/blob/be27d7c6c37234c0423714cce698620c3f090968/docs/Banners/Entidade-Relacionamento.png)

> [Documentação banco de dados](https://github.com/projetoKhali/api3/blob/be27d7c6c37234c0423714cce698620c3f090968/docs/Banners/Documenta%C3%A7%C3%A3o%20BD.pdf)

> [Burndown da Sprint 2](https://github.com/projetoKhali/api3/blob/be27d7c6c37234c0423714cce698620c3f090968/docs/burndown/sprint_2.pdf)

<br>
