#!/usr/bin/env pwsh

# 📚 Script de Teste e Publicação do Storybook
# Use este script para testar e publicar localmente

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║           STORYBOOK - Sistema de Design Vidraçaria        ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

Write-Host "`n📋 Opções disponíveis:" -ForegroundColor Yellow
Write-Host "1. Testar Storybook localmente (npm run storybook)"
Write-Host "2. Compilar Storybook (npm run build-storybook)"
Write-Host "3. Publicar no Chromatic (npx chromatic)"
Write-Host "4. Limpar node_modules e reinstalar"
Write-Host "5. Sair"

$opcao = Read-Host "`nEscolha uma opção (1-5)"

switch($opcao) {
    "1" {
        Write-Host "`n🚀 Iniciando Storybook em desenvolvimento..." -ForegroundColor Green
        Write-Host "Acesse: http://localhost:6006" -ForegroundColor Cyan
        npm run storybook
    }
    "2" {
        Write-Host "`n🔨 Compilando Storybook..." -ForegroundColor Green
        npm run build-storybook
        Write-Host "`n✅ Compilado! Pasta: ./storybook-static" -ForegroundColor Green
    }
    "3" {
        Write-Host "`n📤 Publicando no Chromatic..." -ForegroundColor Green
        Write-Host "Certifique-se de ter o PROJECT_TOKEN!" -ForegroundColor Yellow
        $token = Read-Host "Cole seu Chromatic Project Token"
        
        if($token) {
            npx chromatic --project-token=$token
        } else {
            Write-Host "❌ Token não fornecido!" -ForegroundColor Red
        }
    }
    "4" {
        Write-Host "`n🧹 Limpando node_modules..." -ForegroundColor Green
        Remove-Item -Path "node_modules" -Recurse -Force
        Remove-Item -Path "package-lock.json" -Force
        Write-Host "📥 Reinstalando dependências..." -ForegroundColor Green
        npm install
        Write-Host "`n✅ Dependências reinstaladas!" -ForegroundColor Green
    }
    "5" {
        Write-Host "`n👋 Saindo..." -ForegroundColor Yellow
        exit
    }
    default {
        Write-Host "`n❌ Opção inválida!" -ForegroundColor Red
    }
}

Write-Host "`n✨ Pronto!" -ForegroundColor Green
