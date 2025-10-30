# Task Planner

Task Planner è una moderna applicazione web per la gestione delle attività personali o di team. Permette di creare, visualizzare, modificare e gestire task tramite una comoda interfaccia sia in modalità lista che calendario.

---

## ✨ Features

- **Gestione Task**: Crea, modifica, elimina task
- **Vista Lista**: Visualizza i task come elenco filtrabile
- **Vista Calendario**: Visualizza i task raggruppati per data di scadenza
- **Filtri**: Filtra per stato e priorità
- **CRUD Task**: Operazioni di creazione, lettura, aggiornamento e cancellazione
- **Interfaccia moderna**: UI/UX moderna, responsiva e mobile-friendly

---

## 🛠 Tech Stack

- **Backend**: FastAPI (Python), SQLite (database)
- **Frontend**: React, Vite

---

## 📝 Prerequisiti

- **Python** 3.8 o superiore
- **Node.js** 16.x o superiore
- **npm** o **yarn**

---

## 🚀 Installazione & Avvio

### 1. Clona il repository

```bash
git clone https://github.com/tuo-utente/task-planner.git
cd task-planner
```

### 2. Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
Il backend sarà disponibile su `http://localhost:8000`

### 3. Frontend (React + Vite)

In un nuovo terminale:

```bash
cd frontend
npm install
npm run dev
```
Il frontend sarà disponibile su `http://localhost:5173`

---

## 🖼 Screenshot

![screenshot placeholder](docs/screenshot-placeholder.png)

---

## ✅ Task Completati

- Task 1: Creazione base progetto e struttura repo
- Task 2: Implementazione CRUD task lato backend e frontend
- Task 6: Applicazione di filtri e ricerca nei task
- Task 7: Visualizzazione dinamica in lista e calendario

---

## 📁 Struttura Progetto

```
task-planner/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.db
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── docs/
    └── screenshot-placeholder.png
```

---

## 📚 API Endpoints

Tutte le richieste e risposte sono in formato JSON.

### `GET /tasks`
Restituisce la lista di tutti i task con possibilità di filtraggio.

**Query Params facoltativi:**
- `status`: Filtra per stato
- `priority`: Filtra per priorità

### `GET /tasks/{id}`
Restituisce un singolo task tramite ID.

### `POST /tasks`
Crea un nuovo task.

**Body:**
```json
{
  "title": "string",
  "description": "string",
  "due_date": "YYYY-MM-DD",
  "priority": "bassa|media|alta",
  "status": "todo|in_progress|done|overdue|canceled"
}
```

### `PUT /tasks/{id}`
Aggiorna un task esistente (tutti i campi come per POST).

### `DELETE /tasks/{id}`
Elimina il task specificato.

---

## 👤 Autore

- [Glenda Palumbo] (https://github.com/Glenda-pal)

---

## 📄 Licenza

Distribuito sotto licenza MIT.

---
