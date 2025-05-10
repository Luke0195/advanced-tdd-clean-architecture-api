# Autenticação com Facebook

> ## Dados
* Token de Acesso

> ## Fluxo Primário
1. Obter Dados(nome, email e Facebook ID) da API do Facebook.
2. Consultar se existe um usuário com o email recebido acima.
3. Criar uma conta para o usúario com os dados recebidos do Facebook.
4. Criar um token de acesso, apartir do ID do usuário, com expiração de 30 minutos.
5. Retornar o token de acceso gerado.

> ## Fluxo alternativo: Usuário existe
1. Atualizar a conta do usuário com os dados recebidos Facebook (FacebookIf e o nome só atualizar o nome caso a conta do usuário não possua nome).

> ## Fluxo de exceção: Token inválido ou expirado
1. Retornar um erro de autenticação.
