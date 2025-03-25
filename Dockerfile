# 使用 Python 3.9 slim 版本作为基础镜像
FROM python:3.9-slim

# 设置工作目录
WORKDIR /app

# 配置apt源为阿里云镜像
RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list && \
    sed -i 's/security.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list

# 配置apt以增加网络重试和超时设置
RUN echo 'Acquire::Retries "8";' > /etc/apt/apt.conf.d/80-retries && \
    echo 'Acquire::http::Timeout "240";' > /etc/apt/apt.conf.d/99timeout && \
    echo 'Acquire::https::Timeout "240";' >> /etc/apt/apt.conf.d/99timeout && \
    echo 'APT::Get::Assume-Yes "true";' > /etc/apt/apt.conf.d/90assumeyes && \
    echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99no-check-valid-until

# 更新 apt 缓存并安装必要依赖
RUN rm -rf /var/lib/apt/lists/* && \
    apt-get clean && \
    apt-get update -o Acquire::CompressionTypes::Order::=gz && \
    DEBIAN_FRONTEND=noninteractive \
    apt-get install --no-install-recommends -y \
    build-essential \
    libssl-dev \
    libffi-dev \
    libgomp1 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# 设置 pip 使用阿里云镜像源
ENV PIP_INDEX_URL=https://mirrors.aliyun.com/pypi/simple/
ENV PIP_TRUSTED_HOST=mirrors.aliyun.com

# 将项目依赖文件复制到容器内，并安装依赖
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt \
    --timeout 120 \
    --retries 10

# 将项目所有代码复制到工作目录
COPY . .

# 默认执行嵌入脚本
CMD ["python", "embed.py"]
