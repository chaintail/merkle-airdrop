FROM mcr.microsoft.com/devcontainers/base:ubuntu
# Install the xz-utils package
RUN apt-get update && apt upgrade -y

RUN apt-get install -y \
    git \
    curl \
    wget \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    python3-pip \
    gnupg \
    ca-certificates \
    sudo \
    lsb-release \
    software-properties-common \
    tree 

# Add VS Code user
RUN useradd -m -s /bin/bash vscode && \
    echo "vscode ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
USER vscode
WORKDIR /home/vscode

# Install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
RUN nvm install --lts
RUN nvm use --lts

# Install yek
RUN curl -fsSL https://bodo.run/yek.sh | bash

# Install yarn
RUN npm install -g yarn

# Install Task Master AI
RUN npm i -g task-master-ai