# Chest Shops

Buy and sell items directly from a chest, barrel or trapped chest using a simple sign.

## Create shop

Place a **sign** directly next to, above or below a container and label it in this format:

```
[leave blank]
[amount]
[price]
?
```

| line | Content | Example |
|---|---|---|
| 1 | Leave blank — will automatically become your name | — |
| 2 | Quantity per transaction | `16` |
| 3 | Trade type + price | `B250` |
| 4 | `?` — automatically becomes an item in the container | `?` |

Closing the sign editor creates the shop. You will receive a confirmation in chat.

## Trade Types

The third line determines whether you **sell** or **buy**:

| prefix | Meaning |
|---|---|
| `B` | **Sales Shop** — Shop sells items to players |
| `S` | **Purchase Shop** — Shop buys items from players |

You can use **both modes at the same time** on one sign:

```
[Name]
16
B250/S120
?
```

Here the shop sells for £250 and buys for £120 - all on one sign.

## Trade with a shop

- **Right click** on the sign → **buy items**
- **Left click** on the sign → **sell items**
- **Shift + Click** → buy/sell entire stack at once

## Remove shop

To remove your store:

1. **Sneak** (Hold Shift)
2. **Break off the sign**

The container itself **cannot** be dismantled while a shop is attached to it.

<div class="md-note">
Existing shops cannot be edited. To change price or quantity, remove the sign and recreate the shop.
</div>

## Trust player

Use `/trustshop <player>` to give another player access to your shop container. Run it again to remove their access.

## Share earnings

Use `/shareincome <player> <percentage>` to automatically share part of your shop revenue with another player — useful for jointly operated shops.

## Valid containers

Chest shops work with:
- Chests
- Trapped chests
- Barrels

## Commands

| command | Function |
|---|---|
| `/trustshop <player>` | Give/remove player access to the shop container |
| `/shareincome <player> <percentage>` | Share revenue as a percentage |
| `/shopinfo` | View information about a store |
