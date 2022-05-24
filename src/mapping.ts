import { BigInt } from "@graphprotocol/graph-ts";
import {
	AddExtension,
	UpgradeExtension,
	DeployMarket,
} from "../generated/MarketFactory/MarketFactory";
/* import {
	Market,
	Adjust,
	Create,
	Establish,
	Purchase,
	Restock,
	RoleAdminChanged,
	RoleGranted,
	RoleRevoked,
} from "../generated/Market/Market"; */
//import { ProductEntity, PurchaseEntity } from "../generated/schema";
import * as marketFactoryMappings from "./marketFactory.mapping";

export function handleAddExtension(event: AddExtension): void {
	marketFactoryMappings.handleAddExtension(event);
}

export function handleUpgradeExtension(event: UpgradeExtension): void {
	marketFactoryMappings.handleUpgradeExtension(event);
}

export function handleDeployMarket(event: DeployMarket): void {
	marketFactoryMappings.handleDeployMarket(event);
}

//export function handleAdjust(event: Adjust): void {
// Entities can be loaded from the store using a string ID; this ID
// needs to be unique across all entities of the same type
//let entity = ExampleEntity.load(event.transaction.from.toHex());
// Entities only exist after they have been saved to the store;
// `null` checks allow to create entities on demand
/*if (!entity) {
		entity = new ExampleEntity(event.transaction.from.toHex());

		// Entity fields can be set using simple assignments
		entity.count = BigInt.fromI32(0);
	}*/
// BigInt and BigDecimal math are supported
//entity.count = entity.count + BigInt.fromI32(1);
// Entity fields can be set based on event parameters
//entity.productCode = event.params.productCode;
//entity.productName = event.params.productName;
// Entities can be written to the store with `.save()`
//entity.save();
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
// - contract.ADMIN_ROLE(...)
// - contract.DEFAULT_ADMIN_ROLE(...)
// - contract.catalogUri(...)
// - contract.getRoleAdmin(...)
// - contract.hasRole(...)
// - contract.inspectItem(...)
// - contract.name(...)
// - contract.owner(...)
// - contract.paused(...)
// - contract.supportsInterface(...)
// - contract.symbol(...)
//}

/* export function handleCreate(event: Create): void {
	let contract = Market.bind(event.address);
	let product = ProductEntity.load(event.params.productCode);

	if (!product) {
		product = new ProductEntity(event.params.productCode);

		//product.code = event.params.productCode;
		product.price = event.params.price;
		product.name = event.params.productName;
		product.quantity = event.params.quantity;
		product.initiator = event.params.initiator;

		product.save();
	}
} */

/* export function handleEstablish(event: Establish): void {} */

/* export function handlePurchase(event: Purchase): void {
	let contract = Market.bind(event.address);
	let product = ProductEntity.load(event.params.productCode);
	let purchase = PurchaseEntity.load(
		event.transaction.hash.toHex() + "-" + event.logIndex.toString()
	);

	if (product) {
		product.quantity -= event.params.quantity;

		product.save();
	}

	if (!purchase) {
		purchase = new PurchaseEntity(
			event.transaction.hash.toHex() + "-" + event.logIndex.toString()
		);

		purchase.product = event.params.productCode;
		purchase.quantity = event.params.quantity;
		purchase.value = event.params.value;
		purchase.initiator = event.params.initiator;
	}
} */

/* export function handleRestock(event: Restock): void {
	let contract = Market.bind(event.address);
	let product = ProductEntity.load(event.params.productCode);

	if (product) {
		if (event.params.forced) {
			product.quantity = event.params.quantity;
		} else {
			product.quantity += event.params.quantity;
		}

		product.save();
	}
} */

/* export function handleRoleAdminChanged(event: RoleAdminChanged): void {} */

/* export function handleRoleGranted(event: RoleGranted): void {} */

/* export function handleRoleRevoked(event: RoleRevoked): void {} */
