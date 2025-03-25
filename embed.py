import json
import torch
from transformers import AutoTokenizer, AutoModel

# 加载预训练模型（以 CodeBERT 为例）
tokenizer = AutoTokenizer.from_pretrained("microsoft/codebert-base")
model = AutoModel.from_pretrained("microsoft/codebert-base")
model.eval()

def embed_code(code):
    inputs = tokenizer(code, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    # 取 [CLS] 向量作为嵌入
    return outputs.last_hidden_state[:, 0, :].squeeze().tolist()

# 读取解析后的代码分块数据
with open('code_blocks.json', 'r', encoding='utf-8') as f:
    blocks = json.load(f)

embeddings = {}
for block in blocks:
    block_id = block["id"]
    code = block["code"]
    embeddings[block_id] = embed_code(code)

# 保存嵌入向量
with open('embeddings.json', 'w', encoding='utf-8') as f:
    json.dump(embeddings, f, ensure_ascii=False, indent=2) 