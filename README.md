# Receipt2Notion

![Built with n8n](https://img.shields.io/badge/built%20with-n8n-orange)
![API OpenAI](https://img.shields.io/badge/API-OpenAI-blue)
![Automation](https://img.shields.io/badge/type-automation-green)

## Problem
Manual tracking of daily expenses is inconvenient, time-consuming, and error-prone. The goal was to reduce the effort to a single step: taking a photo of a receipt.

## Solution
Built an n8n workflow that:
- receives receipt images via a Telegram bot
- authenticates users via Telegram ID
- extracts structured data (title, price, date, category) using the OpenAI API
- applies rule-based categorization
- stores results in both a global and category-specific Notion database
- provides user feedback and error handling via Telegram messages

## Example

### Input (Telegram)

![Receipt2Notion n8n Workflow](docs/telegram-example-input.png)

The Telegram bot interface ("R.O.B." – Receipt Organization Bot) acts as the user-facing entry point.

### Processing (OpenAI)

The AI extracts a structured JSON array from the receipt image:

```json
[
  {
    "name": "Strandoase - Cola 0.3",
    "price": 3.5,
    "date": "2026-05-01",
    "category": "Leisure"
  },
  {
    "name": "Strandoase - Pot Kaffee",
    "price": 3.9,
    "date": "2026-05-01",
    "category": "Leisure"
  }
]
```

### Output (Notion)

![Receipt2Notion n8n Workflow](docs/notion-example-output.png)

The extracted data is saved to two Notion databases:
- a global expense database
- a category-specific database

## Tech Stack
- n8n (hosted as a managed service on Hostinger)
- Telegram Bot API
- Notion API
- OpenAI API (GPT-4.1-mini)
- JavaScript (Code nodes)

## Architecture Overview

![Receipt2Notion n8n Workflow](docs/workflow-overview1.png)

The workflow follows an event-driven pipeline:

1. User sends a receipt image via Telegram
2. User is authenticated via Telegram ID
3. Image is processed and sent to an AI model for extraction and categorization
4. Extracted data is validated
5. Results are stored in Notion databases
6. User receives confirmation or error feedback

\*  Users can also request usage instructions via /help.

## Design Decisions
- Used Telegram as the interface for low-friction, mobile-first input
- Chose AI-based extraction over predefined templates to handle unstructured receipt data
- Combined AI extraction with rule-based categorization for reliability
- Used Notion as a lightweight, user-friendly data store

## Security
The production workflow JSON is not included to avoid exposing credential metadata, API configuration, or sensitive headers. Access is restricted via Telegram ID authentication.

## Practical Value
- Reduces manual expense tracking to a single step (taking a photo)
- Minimizes errors compared to manual entry
- Creates structured data for further analysis (e.g. spending insights)
