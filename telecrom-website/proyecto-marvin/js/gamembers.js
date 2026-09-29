(function () {
  'use strict';

  var storageKey = 'gamembers.local.v1';
  var defaultState = {
    tokens: 0,
    goal: 50000,
    contributions: [],
    lastSpinDate: '',
    lastSpinReward: 0,
    lastQuizDate: '',
    lastBudgetDate: '',
    lastHabitDate: '',
    lastSpendDate: '',
    playerName: ''
  };

  function today() {
    var date = new Date();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    return date.getFullYear() + '-' + month + '-' + day;
  }

  function readState() {
    try {
      var saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
      return {
        tokens: Number.isSafeInteger(saved.tokens) && saved.tokens >= 0 ? saved.tokens : 0,
        goal: Number.isSafeInteger(saved.goal) && saved.goal > 0 ? saved.goal : defaultState.goal,
        contributions: Array.isArray(saved.contributions)
          ? saved.contributions.filter(function (entry) {
              return entry && typeof entry.id === 'string'
                && Number.isSafeInteger(entry.amount) && entry.amount > 0
                && typeof entry.date === 'string';
            })
          : [],
        lastSpinDate: typeof saved.lastSpinDate === 'string' ? saved.lastSpinDate : '',
        lastSpinReward: Number.isSafeInteger(saved.lastSpinReward) ? saved.lastSpinReward : 0,
        lastQuizDate: typeof saved.lastQuizDate === 'string' ? saved.lastQuizDate : '',
        lastBudgetDate: typeof saved.lastBudgetDate === 'string' ? saved.lastBudgetDate : '',
        lastHabitDate: typeof saved.lastHabitDate === 'string' ? saved.lastHabitDate : '',
        lastSpendDate: typeof saved.lastSpendDate === 'string' ? saved.lastSpendDate : '',
        playerName: typeof saved.playerName === 'string' ? saved.playerName.slice(0, 30) : ''
      };
    } catch (error) {
      return Object.assign({}, defaultState);
    }
  }

  var state = readState();

  function saveState() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      return true;
    } catch (error) {
      return false;
    }
  }

  function formatMoney(amount) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);
  }

  function announce(message, isError) {
    var status = document.querySelector('[data-gm-status]');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('is-error', Boolean(isError));
  }

  function render() {
    var totalSaved = state.contributions.reduce(function (total, entry) {
      return total + entry.amount;
    }, 0);
    var progress = Math.min(100, Math.round((totalSaved / state.goal) * 100));

    document.querySelectorAll('[data-gm-tokens]').forEach(function (element) {
      element.textContent = state.tokens.toLocaleString('es-CO');
    });

    document.querySelectorAll('[data-gm-saved]').forEach(function (element) {
      element.textContent = formatMoney(totalSaved);
    });

    document.querySelectorAll('[data-gm-goal-value]').forEach(function (element) {
      element.textContent = formatMoney(state.goal);
    });

    document.querySelectorAll('[data-gm-progress]').forEach(function (element) {
      element.value = progress;
      element.setAttribute('aria-valuenow', String(progress));
    });

    document.querySelectorAll('[data-gm-progress-label]').forEach(function (element) {
      element.textContent = progress + '% de la meta';
    });

    var goalInput = document.querySelector('[data-gm-goal-input]');
    if (goalInput && document.activeElement !== goalInput) goalInput.value = state.goal;

    var entriesList = document.querySelector('[data-gm-contributions]');
    if (entriesList) {
      entriesList.replaceChildren();
      state.contributions.slice().reverse().forEach(function (entry) {
        var item = document.createElement('li');
        var details = document.createElement('span');
        var date = document.createElement('time');
        var amount = document.createElement('strong');
        var remove = document.createElement('button');

        details.className = 'gm-entry-details';
        date.dateTime = entry.date;
        date.textContent = new Intl.DateTimeFormat('es-CO', {
          dateStyle: 'medium'
        }).format(new Date(entry.date + 'T12:00:00'));
        amount.textContent = formatMoney(entry.amount);
        details.append(date, amount);
        remove.type = 'button';
        remove.className = 'gm-entry-remove';
        remove.dataset.removeContribution = entry.id;
        remove.setAttribute('aria-label', 'Eliminar aporte de ' + formatMoney(entry.amount));
        remove.textContent = 'Eliminar';
        item.append(details, remove);
        entriesList.append(item);
      });

      if (state.contributions.length === 0) {
        var empty = document.createElement('li');
        empty.className = 'gm-empty-entry';
        empty.textContent = 'Aún no registras aportes.';
        entriesList.append(empty);
      }
    }

    var spinButton = document.querySelector('[data-gm-spin]');
    if (spinButton && state.lastSpinDate === today()) {
      spinButton.disabled = true;
      spinButton.setAttribute('aria-describedby', 'gm-spin-status');
    }

    var spinStatus = document.querySelector('[data-gm-spin-status]');
    if (spinStatus && state.lastSpinDate === today()) {
      spinStatus.textContent = 'Reto completado: ganaste ' + state.lastSpinReward + ' tokens. Vuelve mañana.';
    }

    var gameDates = {
      quiz: state.lastQuizDate,
      budget: state.lastBudgetDate,
      habit: state.lastHabitDate,
      spend: state.lastSpendDate
    };
    var canPlay = Boolean(state.playerName);
    document.querySelectorAll('[data-gm-game-submit]').forEach(function (button) {
      var gameId = button.dataset.gmGameSubmit;
      var completed = gameDates[gameId] === today();
      button.disabled = !canPlay || completed;
      document.querySelectorAll('[data-gm-game="' + gameId + '"]').forEach(function (input) {
        input.disabled = !canPlay || completed;
      });
      var status = document.querySelector('[data-gm-game-status="' + gameId + '"]');
      if (status && completed) status.textContent = 'Reto completado por hoy. Vuelve mañana.';
      document.querySelectorAll('[data-gm-game-login="' + gameId + '"]').forEach(function (link) {
        link.hidden = canPlay;
      });
    });

    var loginInput = document.querySelector('[data-gm-player-input]');
    if (loginInput && document.activeElement !== loginInput) loginInput.value = state.playerName;

    document.querySelectorAll('[data-gm-player-name]').forEach(function (element) {
      element.textContent = state.playerName;
    });

    var sessionLabel = document.querySelector('[data-gm-session-label]');
    if (sessionLabel) {
      sessionLabel.textContent = state.playerName
        ? 'Sesión de prueba: ' + state.playerName + '. Tokens y partidas guardados en este navegador.'
        : 'Vista de prueba: inicia sesión para activar los juegos y ganar tokens.';
    }

    document.querySelectorAll('[data-gm-login-link]').forEach(function (link) {
      link.textContent = state.playerName ? 'Perfil: ' + state.playerName : 'Iniciar sesión';
    });

    var loginStatus = document.querySelector('[data-gm-login-status]');
    if (loginStatus && state.playerName) {
      loginStatus.textContent = 'Sesión de prueba activa como ' + state.playerName + '.';
    }

    var gameLock = document.querySelector('[data-gm-original-lock]');
    var gameContent = document.querySelector('[data-gm-original-content]');
    if (gameLock && gameContent) {
      gameLock.hidden = Boolean(state.playerName);
      gameContent.hidden = !state.playerName;
    }

    document.querySelectorAll('[data-gm-logout]').forEach(function (button) {
      button.hidden = !state.playerName;
    });
  }

  function canSpinToday() {
    return Boolean(state.playerName) && state.lastSpinDate !== today();
  }

  function awardSpin(index) {
    if (!canSpinToday()) return 0;

    var rewards = [10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100];
    var reward = rewards[index];
    if (!Number.isSafeInteger(reward)) return 0;

    state.tokens += reward;
    state.lastSpinDate = today();
    state.lastSpinReward = reward;
    saveState();
    render();
    return reward;
  }

  function claimTrialReward(gameId) {
    var games = {
      quiz: { dateKey: 'lastQuizDate', reward: 5 },
      budget: { dateKey: 'lastBudgetDate', reward: 5 },
      habit: { dateKey: 'lastHabitDate', reward: 3 },
      spend: { dateKey: 'lastSpendDate', reward: 4 }
    };
    var game = games[gameId];
    if (!state.playerName || !game || state[game.dateKey] === today()) return 0;
    state.tokens += game.reward;
    state[game.dateKey] = today();
    saveState();
    render();
    return game.reward;
  }

  function setPlayerName(name) {
    var cleanName = name.replace(/\s+/g, ' ').trim();
    if (cleanName.length < 2 || cleanName.length > 30) return false;
    state.playerName = cleanName;
    saveState();
    render();
    return true;
  }

  function endSession() {
    state.playerName = '';
    saveState();
    render();
  }

  window.GamembersWallet = {
    canSpinToday: canSpinToday,
    awardSpin: awardSpin,
    getTokens: function () { return state.tokens; },
    isLoggedIn: function () { return Boolean(state.playerName); },
    getPlayerName: function () { return state.playerName; },
    setPlayerName: setPlayerName,
    endSession: endSession,
    claimTrialReward: claimTrialReward
  };

  document.addEventListener('DOMContentLoaded', function () {
    render();

    var goalForm = document.querySelector('[data-gm-goal-form]');
    if (goalForm) {
      goalForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var input = goalForm.querySelector('[data-gm-goal-input]');
        var goal = Number(input.value);
        if (!Number.isSafeInteger(goal) || goal < 1000 || goal > 1000000000) {
          announce('Elige una meta entre $1.000 y $1.000.000.000.', true);
          return;
        }
        state.goal = goal;
        saveState();
        render();
        announce('Meta actualizada. Este registro solo se guarda en este navegador.');
      });
    }

    var contributionForm = document.querySelector('[data-gm-contribution-form]');
    if (contributionForm) {
      contributionForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var input = contributionForm.querySelector('[data-gm-contribution-input]');
        var amount = Number(input.value);
        if (!Number.isSafeInteger(amount) || amount < 100 || amount > 1000000000) {
          announce('Registra un aporte entre $100 y $1.000.000.000.', true);
          return;
        }
        state.contributions.push({
          id: Date.now().toString(36) + Math.random().toString(36).slice(2),
          amount: amount,
          date: today()
        });
        saveState();
        contributionForm.reset();
        render();
        announce('Aporte agregado a tu registro local. No se movió dinero.');
      });
    }

    var entriesList = document.querySelector('[data-gm-contributions]');
    if (entriesList) {
      entriesList.addEventListener('click', function (event) {
        var removeButton = event.target.closest('[data-remove-contribution]');
        if (!removeButton) return;
        state.contributions = state.contributions.filter(function (entry) {
          return entry.id !== removeButton.dataset.removeContribution;
        });
        saveState();
        render();
        announce('Aporte eliminado del registro local.');
      });
    }

    var quizForm = document.querySelector('[data-gm-quiz]');
    if (quizForm) {
      quizForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var answer = quizForm.querySelector('input[name="saving-habit"]:checked');
        var status = document.querySelector('[data-gm-quiz-status]');
        if (!answer) {
          status.textContent = 'Elige una respuesta para continuar.';
          status.classList.add('is-error');
          return;
        }
        if (answer.value !== 'plan') {
          status.textContent = 'Todavía no. Piensa en un hábito que puedas repetir.';
          status.classList.add('is-error');
          return;
        }
        if (state.lastQuizDate === today()) return;
        var reward = claimTrialReward('quiz');
        status.classList.remove('is-error');
        status.textContent = reward
          ? '¡Correcto! Sumaste ' + reward + ' tokens virtuales.'
          : 'Ya completaste este reto hoy.';
      });
    }

    var budgetForm = document.querySelector('[data-gm-budget-form]');
    if (budgetForm) {
      budgetForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var saved = Number(budgetForm.querySelector('[name="budget-saved"]').value);
        var spent = Number(budgetForm.querySelector('[name="budget-spent"]').value);
        var status = document.querySelector('[data-gm-game-status="budget"]');
        if (!Number.isInteger(saved) || !Number.isInteger(spent) || saved + spent !== 100) {
          status.textContent = 'La suma debe ser exactamente 100 tokens.';
          status.classList.add('is-error');
          return;
        }
        if (saved < 20) {
          status.textContent = 'Reserva al menos 20 tokens para cumplir la condición.';
          status.classList.add('is-error');
          return;
        }
        var reward = claimTrialReward('budget');
        status.classList.remove('is-error');
        status.textContent = reward
          ? '¡Reto superado! Sumaste ' + reward + ' tokens virtuales.'
          : 'Ya completaste este reto hoy.';
      });
    }

    var habitForm = document.querySelector('[data-gm-habit-form]');
    if (habitForm) {
      habitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var answer = habitForm.querySelector('input[name="saving-fact"]:checked');
        var status = document.querySelector('[data-gm-game-status="habit"]');
        if (!answer) {
          status.textContent = 'Elige una respuesta para continuar.';
          status.classList.add('is-error');
          return;
        }
        if (answer.value !== 'true') {
          status.textContent = 'No exactamente. Un hábito constante importa más que empezar con mucho.';
          status.classList.add('is-error');
          return;
        }
        var reward = claimTrialReward('habit');
        status.classList.remove('is-error');
        status.textContent = reward
          ? '¡Correcto! Sumaste ' + reward + ' tokens virtuales.'
          : 'Ya completaste este reto hoy.';
      });
    }

    var spendForm = document.querySelector('[data-gm-spend-form]');
    if (spendForm) {
      spendForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var selected = Array.from(spendForm.querySelectorAll('input[name="small-expense"]:checked'))
          .map(function (input) { return input.value; })
          .sort();
        var status = document.querySelector('[data-gm-game-status="spend"]');
        if (selected.length !== 2 || selected[0] !== 'delivery' || selected[1] !== 'unused') {
          status.textContent = 'Busca costos repetidos que puedas revisar sin descuidar necesidades.';
          status.classList.add('is-error');
          return;
        }
        var reward = claimTrialReward('spend');
        status.classList.remove('is-error');
        status.textContent = reward
          ? '¡Bien visto! Sumaste ' + reward + ' tokens virtuales.'
          : 'Ya completaste este reto hoy.';
      });
    }

    var loginForm = document.querySelector('[data-gm-login-form]');
    if (loginForm) {
      loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var input = loginForm.querySelector('[data-gm-player-input]');
        var status = document.querySelector('[data-gm-login-status]');
        if (!setPlayerName(input.value)) {
          status.textContent = 'Escribe un nombre de entre 2 y 30 caracteres.';
          status.classList.add('is-error');
          input.focus();
          return;
        }
        window.location.assign('ruleta.html');
      });
    }

    document.querySelectorAll('[data-gm-logout]').forEach(function (button) {
      button.addEventListener('click', function () {
        endSession();
        if (document.querySelector('[data-gm-original-game]')) {
          window.location.assign('login.html');
        } else {
          announce('Sesión de prueba cerrada. Tu progreso local sigue guardado.');
        }
      });
    });

    var resetButton = document.querySelector('[data-gm-reset]');
    if (resetButton) {
      resetButton.addEventListener('click', function () {
        if (!window.confirm('¿Borrar el saldo, los aportes y los retos guardados en este navegador?')) return;
        state = Object.assign({}, defaultState, { contributions: [], playerName: state.playerName });
        saveState();
        render();
        announce('Progreso local borrado.');
      });
    }
  });

  window.addEventListener('storage', function (event) {
    if (event.key !== storageKey && event.key !== null) return;
    state = readState();
    render();
  });
})();
