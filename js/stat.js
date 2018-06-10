'use strict';

/*
 * Массивы, циклические алгоритмы, объекты, свойства и методы, DOM, canvas, отладчик кода.
*/

var CLOUD_COLOR = '#fff';
var CLOUD_INITIAL_X = 100;
var CLOUD_INITIAL_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var SHADOW_SIZE = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

var BAR_WIDTH = 40;
var BAR_GUTTER = 50;

var TITLE_COLOR = '#000';
var TITLE_FONT = '16px PT Mono';
var TITLE_BASELINE = 'hanging';
var TITLE_GAP = 20;

var HISTOGRAM_HEIGHT = 150;
var HISTOGRAM_INITIAL_X = CLOUD_INITIAL_X + BAR_GUTTER;
var HISTOGRAM_INITIAL_Y = CLOUD_HEIGHT - CLOUD_INITIAL_Y - HISTOGRAM_HEIGHT - TITLE_GAP;

var PLAYER_NAME = 'Вы';
var PLAYER_COLOR = '#F00';

var getMaxItem = function (list) {

  var max = list[0];

  for (var i = 1; i < list.length; i++) {
    if (list[i] > max) {
      max = list[i];
    }
  }

  return max;
};

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderTitle = function (ctx, text, xGap, yGap) {
  ctx.fillStyle = TITLE_COLOR;
  ctx.font = TITLE_FONT;
  ctx.textBaseline = TITLE_BASELINE;
  ctx.fillText(text, CLOUD_INITIAL_X + xGap, CLOUD_INITIAL_Y + yGap);
};

var renderBar = function (ctx, name, score, step, index) {

  var barHeight = score * step;
  var barX = HISTOGRAM_INITIAL_X + index * (BAR_WIDTH + BAR_GUTTER);
  var barY = HISTOGRAM_INITIAL_Y + (HISTOGRAM_HEIGHT - barHeight);

  ctx.fillStyle = name === PLAYER_NAME ? PLAYER_COLOR : 'hsl(240, ' + getRandomValue(1, 100) + '%, 45%)';
  ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);

  ctx.fillStyle = TITLE_COLOR;
  ctx.fillText(score, barX, barY - TITLE_GAP);
  ctx.fillText(name, barX, barY + barHeight + TITLE_GAP / 2);
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_INITIAL_X + SHADOW_SIZE, CLOUD_INITIAL_Y + SHADOW_SIZE, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_INITIAL_X, CLOUD_INITIAL_Y, CLOUD_COLOR);

  renderTitle(ctx, 'Ура вы победили!', TITLE_GAP, TITLE_GAP);
  renderTitle(ctx, 'Список результатов:', TITLE_GAP, TITLE_GAP * 2);

  var step = (HISTOGRAM_HEIGHT - TITLE_GAP) / getMaxItem(times);

  for (var i = 0; i < times.length; i++) {
    renderBar(ctx, names[i], Math.ceil(times[i]), step, i);
  }
};
