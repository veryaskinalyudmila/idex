import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  ChainPropagationPeriodChanged,
  Deposited,
  DispatcherChanged,
  FeeWalletChanged,
  OrderNonceInvalidated,
  TokenRegistered,
  TokenRegistrationConfirmed,
  TokenSymbolAdded,
  TradeExecuted,
  WalletExitCleared,
  WalletExitWithdrawn,
  WalletExited,
  Withdrawn
} from "../generated/Contract/Contract"
import { Token,Volume,Deposit,Withdraw,Balance,Trade,Trader } from "../generated/schema"

export function CreateToken(address: Address): User {
  let user = User.load(address.toHexString());

  if (user == null) {
    user = new User(address.toHexString());
    user.save();
  }
  return user as User;
}

export function handleChainPropagationPeriodChanged(
  event: ChainPropagationPeriodChanged
): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.previousValue = event.params.previousValue
  entity.newValue = event.params.newValue

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.loadAssetBySymbol(...)
  // - contract.loadBalanceInAssetUnitsByAddress(...)
  // - contract.loadBalanceInAssetUnitsBySymbol(...)
  // - contract.loadBalanceInPipsByAddress(...)
  // - contract.loadBalanceInPipsBySymbol(...)
  // - contract.loadFeeWallet(...)
  // - contract.loadPartiallyFilledOrderQuantityInPips(...)
}

export function handleDeposited(event: Deposited): void {}

export function handleDispatcherChanged(event: DispatcherChanged): void {}

export function handleFeeWalletChanged(event: FeeWalletChanged): void {}

export function handleOrderNonceInvalidated(
  event: OrderNonceInvalidated
): void {}

export function handleTokenRegistered(event: TokenRegistered): void {}

export function handleTokenRegistrationConfirmed(
  event: TokenRegistrationConfirmed
): void {}

export function handleTokenSymbolAdded(event: TokenSymbolAdded): void {}

export function handleTradeExecuted(event: TradeExecuted): void {
  let entity = Trade.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new Trade(event.transaction.hash.toHex())
  }
  entity.basetoken=event.params.baseAssetSymbolIndex
  entity.save()

}

export function handleWalletExitCleared(event: WalletExitCleared): void {}

export function handleWalletExitWithdrawn(event: WalletExitWithdrawn): void {}

export function handleWalletExited(event: WalletExited): void {}

export function handleWithdrawn(event: Withdrawn): void {}
