"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, FileText, Send, Eye } from "lucide-react";
import { customers } from "@/data/customers";
import { equipment } from "@/data/equipment";

type QuoteItem = {
  equipmentId: string;
  equipmentName: string;
  dailyRate: number;
  quantity: number;
  days: number;
};

export default function NewQuotePage() {
  const [customerId, setCustomerId] = useState("");
  const [siteName, setSiteName] = useState("");
  const [quoteDate] = useState(new Date().toISOString().split("T")[0]);
  const [validUntil, setValidUntil] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [notes, setNotes] = useState("");

  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [days, setDays] = useState(30);

  const selectedCustomer = customers.find((c) => c.id === customerId);
  const availableEquipment = equipment.filter((e) => e.status === "available");

  const addItem = () => {
    const eq = equipment.find((e) => e.id === selectedEquipment);
    if (eq) {
      setItems([
        ...items,
        {
          equipmentId: eq.id,
          equipmentName: eq.name,
          dailyRate: eq.dailyRate,
          quantity,
          days,
        },
      ]);
      setSelectedEquipment("");
      setQuantity(1);
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + item.dailyRate * item.quantity * item.days, 0);
  const total = subtotal + deliveryFee;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Form */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>見積書作成</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Customer Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">顧客</label>
                <Select value={customerId} onValueChange={setCustomerId}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="顧客を選択..." />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">現場名</label>
                <Input
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="例: 渋谷再開発プロジェクト"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">見積日</label>
                <Input value={quoteDate} readOnly className="mt-1 bg-muted" />
              </div>
              <div>
                <label className="text-sm font-medium">有効期限</label>
                <Input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <Separator />

            {/* Add Items */}
            <div>
              <h3 className="font-medium mb-3">品目追加</h3>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                    <SelectTrigger>
                      <SelectValue placeholder="機材を選択..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableEquipment.map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.name} (¥{e.dailyRate.toLocaleString()}/日)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min={1}
                    placeholder="数量"
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    min={1}
                    placeholder="日数"
                  />
                </div>
              </div>
              <Button onClick={addItem} disabled={!selectedEquipment} variant="outline" className="mt-2">
                <Plus className="mr-2 h-4 w-4" />
                品目を追加
              </Button>
            </div>

            {/* Items Table */}
            {items.length > 0 && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>品目</TableHead>
                      <TableHead className="text-right">単価/日</TableHead>
                      <TableHead className="text-right">数量</TableHead>
                      <TableHead className="text-right">日数</TableHead>
                      <TableHead className="text-right">金額</TableHead>
                      <TableHead className="w-[50px]" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.equipmentName}</TableCell>
                        <TableCell className="text-right">¥{item.dailyRate.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">{item.days}</TableCell>
                        <TableCell className="text-right">
                          ¥{(item.dailyRate * item.quantity * item.days).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">配送費</label>
                <Input
                  type="number"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">備考</label>
                <Input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="備考を入力..."
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Card */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">プレビュー</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">顧客</p>
              <p className="font-medium">{selectedCustomer?.name || "未選択"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">現場名</p>
              <p className="font-medium">{siteName || "未入力"}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">品目数</p>
              <p className="font-medium">{items.length}件</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">小計</p>
              <p className="font-medium">¥{subtotal.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">配送費</p>
              <p className="font-medium">¥{deliveryFee.toLocaleString()}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">合計</p>
              <p className="text-2xl font-bold text-[hsl(var(--primary))]">
                ¥{total.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full">
            <Eye className="mr-2 h-4 w-4" />
            プレビュー
          </Button>
          <Button variant="outline" className="w-full">
            <FileText className="mr-2 h-4 w-4" />
            PDF出力
          </Button>
          <Button className="w-full bg-[hsl(var(--primary))]">
            <Send className="mr-2 h-4 w-4" />
            見積を送信
          </Button>
        </div>
      </div>
    </div>
  );
}
